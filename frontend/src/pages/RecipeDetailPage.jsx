import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Reveal from '../components/Reveal'
import Skeleton from '../components/Skeleton'
import { fetchRecipe } from '../lib/api'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'
import { capitalize, formatDuration } from '../utils/Format'

const META_LABELS = [
  ['Temps', (recipe) => formatDuration(recipe.duration)],
  ['Portions', (recipe) => `${recipe.peopleNb} pers.`],
  ['Difficulté', (recipe) => capitalize(recipe.difficulty)],
]

export default function RecipeDetailPage() {
  const { id } = useParams()

  // The id travels with the result so that navigating straight from one recipe
  // to another shows the loading state instead of the previous recipe, without
  // having to reset the state from inside the effect.
  const [result, setResult] = useState({ id: null, recipe: null, error: null })

  useEffect(() => {
    let cancelled = false

    fetchRecipe(id)
      .then((response) => {
        if (!cancelled) setResult({ id, recipe: response.data, error: null })
      })
      .catch((failure) => {
        if (!cancelled) setResult({ id, recipe: null, error: failure?.status ?? 500 })
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const loaded = result.id === id
  const recipe = loaded ? result.recipe : null
  const error = loaded ? result.error : null

  usePageTitle(recipe?.name ?? 'Recette')

  if (error) {
    return (
      <section className="py-16 text-center">
        <Reveal as="h1" className="text-2xl font-bold text-ink">
          {error === 404 ? "Cette recette n'existe pas." : 'Recette indisponible.'}
        </Reveal>
        <Reveal as="p" delay={80} className="mt-4 text-sm text-muted">
          {error === 404
            ? 'Elle a peut-être été supprimée depuis que vous avez ouvert la liste.'
            : 'Réessayez dans un instant.'}
        </Reveal>
        <Reveal delay={160} className="mt-8">
          <Link
            to={routes.recipes}
            className="inline-block rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-85 motion-reduce:transition-none"
          >
            Retour aux recettes
          </Link>
        </Reveal>
      </section>
    )
  }

  if (!recipe) {
    return (
      <section role="status" aria-label="Chargement de la recette">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-4 h-9 w-2/3 max-w-md" />

        <div className="mt-6 flex flex-wrap gap-8">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="mt-5 flex gap-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>

        <div className="mt-8 flex max-w-2xl flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="mt-10 max-w-xl">
          <Skeleton className="h-5 w-32" />
          <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex items-center justify-between px-5 py-3.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const ingredients = recipe.recipe_ingredients ?? []

  return (
    <section>
      <Reveal as="p" className="text-sm font-medium text-brand">
        <Link to={routes.recipes} className="hover:underline">
          ← Mes recettes
        </Link>
      </Reveal>

      <Reveal as="h1" delay={80} className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {recipe.name}
      </Reveal>

      <Reveal delay={160} className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-muted">
        {META_LABELS.map(([label, read]) => (
          <span key={label}>
            <span className="text-ink">{read(recipe)}</span> · {label}
          </span>
        ))}
      </Reveal>

      {recipe.tags?.length > 0 && (
        <Reveal delay={200} className="mt-5 flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full border border-line bg-mint px-3 py-1 text-xs font-medium text-ink"
            >
              {capitalize(tag.name)}
            </span>
          ))}
        </Reveal>
      )}

      {recipe.description && (
        <Reveal as="p" delay={240} className="mt-8 max-w-2xl leading-relaxed text-muted">
          {recipe.description}
        </Reveal>
      )}

      <Reveal delay={320} className="mt-10 max-w-xl">
        <h2 className="text-lg font-bold text-ink">Ingrédients</h2>

        {ingredients.length > 0 ? (
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {ingredients.map((line) => (
              <li key={line.id} className="flex items-baseline justify-between px-5 py-3 text-sm">
                <span className="text-ink">{capitalize(line.ingredient?.name)}</span>
                <span className="text-muted">
                  {line.quantity} {line.unit?.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">Aucun ingrédient n&apos;est encore renseigné.</p>
        )}
      </Reveal>

      {/* The recipes table has no steps column yet, so the page stops at the
          shopping side of things. */}
      <Reveal delay={400} className="mt-10 rounded-2xl bg-mint px-6 py-5 text-sm leading-relaxed text-muted sm:px-8">
        Les étapes de préparation ne sont pas encore stockées côté serveur.
      </Reveal>
    </section>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import RecipeCard from '../components/recipes/RecipeCard'
import Reveal from '../components/Reveal'
import { useAuth } from '../context/AuthContext'
import { fetchTags, fetchUserRecipes } from '../lib/api'
import { recipePath } from '../routes'
import usePageTitle from '../usePageTitle'
import { capitalize } from '../utils/Format'
import { showErrorToast } from '../utils/Toast'

export default function RecipesPage() {
  usePageTitle('Mes recettes')

  const { user } = useAuth()
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTagIds, setSelectedTagIds] = useState([])
  const [searchedTerm, setSearchedTerm] = useState('')

  useEffect(() => {
    if (!user?.id) return

    let cancelled = false

    fetchUserRecipes(user.id)
      .then((response) => {
        if (!cancelled) setRecipes(response.data ?? [])
      })
      .catch(() => {
        if (!cancelled) showErrorToast('Erreur lors de la récupération des recettes.')
      })

    // The user can log out while the request is in flight; dropping the
    // response then avoids setting state on an unmounted page.
    return () => {
      cancelled = true
    }
  }, [user?.id])

  useEffect(() => {
    let cancelled = false

    fetchTags()
      .then((response) => {
        if (!cancelled) setTags(response.data ?? [])
      })
      .catch(() => {
        if (!cancelled) showErrorToast('Erreur lors de la récupération des tags.')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const toggleTag = (tagId) => {
    setSelectedTagIds((current) =>
      current.includes(tagId) ? current.filter((id) => id !== tagId) : [...current, tagId],
    )
  }

  // Search matches the name or the description; tags narrow it further, a
  // recipe having to carry every tag picked.
  const filteredRecipes = useMemo(() => {
    const cleanSearch = searchedTerm.trim().toLowerCase()

    return recipes.filter((recipe) => {
      const matchesSearch =
        cleanSearch === '' ||
        recipe.name?.toLowerCase().includes(cleanSearch) ||
        recipe.description?.toLowerCase().includes(cleanSearch)

      const recipeTagIds = (recipe.tags ?? []).map((tag) => tag.id)
      const matchesTags = selectedTagIds.every((id) => recipeTagIds.includes(id))

      return matchesSearch && matchesTags
    })
  }, [recipes, searchedTerm, selectedTagIds])

  // Only the tags actually carried by the user's recipes are worth offering:
  // the full list is ~50 entries and most would filter down to nothing.
  const availableTags = useMemo(() => {
    const usedTagIds = new Set(recipes.flatMap((recipe) => (recipe.tags ?? []).map((tag) => tag.id)))
    return tags.filter((tag) => usedTagIds.has(tag.id))
  }, [tags, recipes])

  return (
    <section className="border-b border-line px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
      <Reveal as="h1" className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Mes recettes
      </Reveal>

      <Reveal delay={80} className="mt-8 max-w-xl">
        <label htmlFor="recipe-search" className="sr-only">
          Rechercher une recette
        </label>
        <input
          id="recipe-search"
          type="search"
          value={searchedTerm}
          placeholder="Rechercher une recette..."
          onChange={(event) => setSearchedTerm(event.target.value)}
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink transition-all focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
        />
      </Reveal>

      {availableTags.length > 0 && (
        <Reveal delay={160} className="mt-5 flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const active = selectedTagIds.includes(tag.id)

            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active
                    ? 'border-brand bg-brand text-white'
                    : 'border-line bg-white text-muted hover:border-brand/40 hover:text-ink'
                }`}
              >
                {capitalize(tag.name)}
              </button>
            )
          })}
        </Reveal>
      )}

      {filteredRecipes.length > 0 ? (
        <div className="mt-10 grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewClick={() => navigate(recipePath(recipe.id))}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted">Aucune recette n&apos;a été trouvée.</p>
      )}
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Reveal from '../components/Reveal'
import Skeleton from '../components/Skeleton'
import { useAuth } from '../context/AuthContext'
import { fetchUserRecipes } from '../lib/api'
import { recipePath, routes } from '../routes'
import usePageTitle from '../usePageTitle'
import { capitalize, formatDuration } from '../utils/Format'

// Nothing below is backed by the API yet: there is no inventory, no expiry
// date, no meal planning and no waste tracking server-side. The figures are
// frozen so the screen can be reviewed, and each block is wired to a single
// constant to replace once those tables exist.
const STOCK_TILES = [
  { label: 'Produits en stock', value: 5, caption: 'bien approvisionné', accent: 'bg-brand-soft' },
  { label: 'Expire bientôt', value: 2, caption: 'à consommer sous 48 h', accent: 'bg-amber-100' },
  { label: 'Produits expirés', value: 1, caption: 'à traiter rapidement', accent: 'bg-red-100' },
  { label: 'Repas planifiés', value: 3, caption: 'cette semaine', accent: 'bg-violet-100' },
]

const ALERTS = [
  {
    tone: 'bg-amber-50',
    dot: 'bg-amber-200',
    title: '2 produits à consommer rapidement',
    lines: ['Lait — expire dans 2 jours', 'Yaourt nature — expire demain'],
  },
  {
    tone: 'bg-mint',
    dot: 'bg-line',
    title: '1 produit est périmé',
    lines: ['Œufs — expiré depuis 2 jours'],
  },
]

const IMPACT = [
  { value: '5', label: 'Produits consommés', tone: 'text-brand' },
  { value: '2%', label: 'Taux de gaspillage', tone: 'text-danger' },
  { value: '5 Kg', label: 'CO₂ économisé', tone: 'text-violet-600' },
]

const DATE_FORMAT = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }

export default function DashboardPage() {
  usePageTitle('Tableau de bord')

  const { user } = useAuth()
  const [suggestions, setSuggestions] = useState(null)

  useEffect(() => {
    if (!user?.id) return

    let cancelled = false

    fetchUserRecipes(user.id)
      .then((response) => {
        if (!cancelled) setSuggestions((response.data ?? []).slice(0, 2))
      })
      .catch(() => {
        if (!cancelled) setSuggestions([])
      })

    return () => {
      cancelled = true
    }
  }, [user?.id])

  const today = new Date().toLocaleDateString('fr-FR', DATE_FORMAT)

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <Reveal>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-muted">{today}</p>
        </Reveal>

        <Reveal delay={80} className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink transition duration-200 hover:border-brand/40 motion-reduce:transition-none"
          >
            Rechercher
          </button>
          <button
            type="button"
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transition-none"
          >
            Ajouter un produit
          </button>
        </Reveal>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STOCK_TILES.map(({ label, value, caption, accent }, index) => (
          <Reveal
            key={label}
            delay={160 + index * 60}
            className="rounded-2xl border border-line bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-muted">{label}</p>
              <span className={`size-7 shrink-0 rounded-lg ${accent}`} />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-ink">{value}</p>
            <p className="mt-3 text-xs text-muted">{caption}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal delay={420} className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-ink">Alertes et notifications</h2>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
              2 nouvelles
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {ALERTS.map(({ tone, dot, title, lines }) => (
              <div key={title} className={`flex gap-3 rounded-xl ${tone} px-4 py-3.5`}>
                <span className={`mt-0.5 size-6 shrink-0 rounded-lg ${dot}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="mt-1 text-xs text-muted">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={480} className="flex flex-col rounded-2xl border border-line bg-white p-6">
          <h2 className="text-lg font-bold text-ink">Recettes suggérées</h2>
          <p className="mt-1 text-xs text-muted">Basées sur votre inventaire</p>

          <div className="mt-5 flex-1 divide-y divide-line">
            {suggestions === null ? (
              Array.from({ length: 2 }, (_, index) => (
                <div key={index} className="py-4 first:pt-0">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="mt-2 h-3 w-11/12" />
                  <div className="mt-3 flex gap-6">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                </div>
              ))
            ) : suggestions.length > 0 ? (
              suggestions.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={recipePath(recipe.id)}
                  className="block py-4 transition-colors first:pt-0 hover:text-brand"
                >
                  <p className="text-base font-semibold text-ink">{capitalize(recipe.name)}</p>
                  {recipe.description && (
                    <p className="mt-1 text-xs text-muted">{recipe.description}</p>
                  )}
                  <p className="mt-2 flex gap-6 text-xs font-medium text-muted">
                    <span>{formatDuration(recipe.duration)}</span>
                    <span>{recipe.peopleNb} pers.</span>
                  </p>
                </Link>
              ))
            ) : (
              <p className="py-4 text-sm text-muted">
                Aucune recette pour l&apos;instant. Ajoutez-en une pour voir des suggestions ici.
              </p>
            )}
          </div>

          <Link
            to={routes.recipes}
            className="mt-5 block rounded-xl bg-brand px-5 py-3 text-center text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transition-none"
          >
            Voir les autres recettes
          </Link>
        </Reveal>
      </div>

      <Reveal delay={560} className="mt-5 rounded-2xl bg-brand-soft px-6 py-7 sm:px-8">
        <h2 className="text-lg font-bold text-ink">Votre impact écologique</h2>

        <div className="mt-6 grid gap-6 text-center sm:grid-cols-3">
          {IMPACT.map(({ value, label, tone }) => (
            <div key={label}>
              <p className={`text-3xl font-extrabold ${tone}`}>{value}</p>
              <p className="mt-2 text-xs text-muted">{label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  )
}

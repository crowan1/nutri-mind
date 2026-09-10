import { Link } from 'react-router-dom'

import { routes } from '../routes'
import Logo from './Logo'

const TAGLINE =
  "L'assistant qui transforme votre frigo en allié anti-gaspillage. Gérez, cuisinez, économisez."

const columns = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', to: routes.features },
      { label: 'Inventaire intelligent', to: routes.inventory },
      { label: 'Recettes', to: routes.recipes },
      { label: 'Tarifs', to: routes.pricing },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Blog anti-gaspi', to: routes.blog },
      { label: 'Guide de démarrage', to: routes.gettingStarted },
      { label: "Centre d'aide", to: routes.help },
      { label: 'Communauté', to: routes.community },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', to: routes.about },
      { label: 'Notre mission', to: routes.mission },
      { label: 'Contact', to: routes.contact },
      { label: 'Mentions légales', to: routes.legal },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
      <div className="grid gap-x-6 gap-y-10 min-[420px]:grid-cols-2 sm:gap-10 lg:grid-cols-[minmax(0,5fr)_repeat(3,minmax(0,3fr))]">
        <div className="min-[420px]:col-span-2 sm:col-span-1">
          <Logo wordmarkClassName="text-brand" />
          <p className="mt-4 max-w-[15rem] text-sm leading-relaxed text-muted">{TAGLINE}</p>
        </div>

        {columns.map(({ title, links }) => (
          <div key={title}>
            <h2 className="text-sm font-semibold text-ink">{title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="inline-block text-muted transition duration-200 hover:translate-x-0.5 hover:text-ink motion-reduce:transition-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Nutri&apos;Mind - Pour une consommation bien vivante.</p>
        <p>
          <Link to={routes.privacy} className="transition-colors hover:text-ink">
            Confidentialité
          </Link>
          {' · '}
          <Link to={routes.terms} className="transition-colors hover:text-ink">
            Conditions
          </Link>
        </p>
      </div>
    </footer>
  )
}

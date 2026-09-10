import { Link } from 'react-router-dom'

import { FridgeIcon, LeafIcon, PotIcon } from '../components/icons'
import Reveal from '../components/Reveal'
import { useAuth } from '../context/AuthContext'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'

const shortcuts = [
  {
    title: 'Inventaire',
    description: 'Consultez et gérez les produits de votre frigo.',
    to: routes.inventory,
    Icon: FridgeIcon,
  },
  {
    title: 'Recettes',
    description: 'Trouvez des idées avec ce que vous avez sous la main.',
    to: routes.recipes,
    Icon: PotIcon,
  },
  {
    title: 'Conseils',
    description: 'Réduisez le gaspillage au quotidien.',
    to: routes.gettingStarted,
    Icon: LeafIcon,
  },
]

export default function DashboardPage() {
  usePageTitle('Tableau de bord')

  const { user } = useAuth()
  const displayName = user?.name || user?.email?.split('@')[0] || 'Utilisateur'

  return (
    <section className="border-b border-line px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
      <Reveal as="p" className="text-sm font-medium text-brand">
        Tableau de bord
      </Reveal>

      <Reveal as="h1" delay={80} className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Bonjour, {displayName}
      </Reveal>

      <Reveal as="p" delay={160} className="mt-4 max-w-2xl leading-relaxed text-muted">
        Bienvenue sur Nutri&apos;Mind. Retrouvez ici vos raccourcis pour suivre votre inventaire,
        cuisiner sans gaspiller et avancer pas à pas.
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {shortcuts.map(({ title, description, to, Icon }, index) => (
          <Reveal key={title} delay={240 + index * 80}>
            <Link
              to={to}
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg motion-reduce:transition-none"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <h2 className="mt-5 text-lg font-bold text-ink">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>
              <span className="mt-5 text-sm font-medium text-brand">Ouvrir →</span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={520}
        className="mt-10 rounded-2xl bg-mint px-6 py-5 text-sm leading-relaxed text-muted sm:px-8"
      >
        Connecté en tant que <span className="font-medium text-ink">{user?.email}</span>.
      </Reveal>
    </section>
  )
}

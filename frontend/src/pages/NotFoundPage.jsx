import { Link } from 'react-router-dom'

import Reveal from '../components/Reveal'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page introuvable')

  return (
    <section className="flex flex-col items-center px-6 py-20 text-center sm:px-10 sm:py-28">
      <Reveal as="p" className="text-xs font-medium tracking-[0.18em] text-brand">
        Erreur 404
      </Reveal>

      <Reveal
        as="h1"
        delay={80}
        className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl"
      >
        Cette page n&apos;existe pas encore.
      </Reveal>

      <Reveal as="p" delay={160} className="mt-5 max-w-md leading-relaxed text-muted">
        Le lien est valide mais la page reste à construire. Revenez à l&apos;accueil en attendant.
      </Reveal>

      <Reveal delay={240} className="mt-8">
        <Link
          to={routes.home}
          className="inline-block rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-85 active:translate-y-0 motion-reduce:transition-none"
        >
          Retour à l&apos;accueil
        </Link>
      </Reveal>
    </section>
  )
}

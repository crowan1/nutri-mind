import Reveal from '../components/Reveal'
import usePageTitle from '../usePageTitle'

// Placeholder for the sidebar sections whose backend does not exist yet. It
// keeps the navigation honest: the link works and the layout holds, instead of
// dropping the user on a 404 that blames them for a missing feature.
export default function ComingSoonPage({ title, detail }) {
  usePageTitle(title)

  return (
    <section className="py-10">
      <Reveal as="p" className="text-sm font-medium text-brand">
        Bientôt
      </Reveal>

      <Reveal as="h1" delay={80} className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        {title}
      </Reveal>

      <Reveal as="p" delay={160} className="mt-4 max-w-xl leading-relaxed text-muted">
        {detail}
      </Reveal>
    </section>
  )
}

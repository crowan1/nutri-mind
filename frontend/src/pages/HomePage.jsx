import { Link } from 'react-router-dom'

// Photo d'illustration, Unsplash (licence libre, sans attribution requise) :
// https://unsplash.com/photos/a-bowl-of-food-with-a-variety-of-vegetables
import heroPhoto from '../assets/hero-plat.jpg'
import { ClockIcon, LeafIcon } from '../components/icons'
import Reveal from '../components/Reveal'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'

const LEAD = "Créez un compte et connectez-vous pour débuter votre expérience Nutri'Mind."

const stats = [
  { value: '-40%', label: 'de gaspillage' },
  { value: '12k', label: 'foyers engagés' },
  { value: '4,8★', label: 'note moyenne' },
]

function FloatingCard({ className, Icon, label, value }) {
  return (
    <div
      className={`absolute flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg ring-1 ring-line/70 motion-safe:animate-float ${className}`}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-[11px] leading-tight text-muted">{label}</p>
        <p className="text-sm font-semibold leading-tight text-ink">{value}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  usePageTitle()

  return (
    <section className="grid items-center gap-12 border-b border-line px-6 py-14 sm:gap-16 sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:px-16">
      <div>
        <Reveal
          as="p"
          className="inline-block rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-medium text-brand"
        >
          Zéro gaspillage alimentaire
        </Reveal>

        <Reveal
          as="h1"
          delay={80}
          className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:mt-7 sm:text-5xl lg:text-6xl"
        >
          Prêts à ne plus
          <br />
          <span className="text-brand">gaspiller</span> ?
        </Reveal>

        <Reveal as="p" delay={160} className="mt-6 max-w-xs leading-relaxed text-muted">
          {LEAD}
        </Reveal>

        <Reveal delay={240} className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link
            to={routes.register}
            className="rounded-lg bg-ink px-5 py-3 font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-85 active:translate-y-0 motion-reduce:transition-none"
          >
            Commencer gratuitement
          </Link>
          <Link
            to={routes.about}
            className="rounded-lg border border-line bg-white px-5 py-3 font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:border-ink/25 active:translate-y-0 motion-reduce:transition-none"
          >
            En savoir plus
          </Link>
        </Reveal>

        <Reveal
          as="dl"
          delay={320}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-5 sm:mt-12 sm:gap-x-10"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <dd className="text-xl font-bold text-ink">{value}</dd>
              <dt className="mt-0.5 text-xs text-muted">{label}</dt>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={120} className="relative">
        <div className="group aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
          <img
            src={heroPhoto}
            alt="Bol de légumes frais, tofu grillé, maïs et tomates cerises"
            width="1200"
            height="900"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>

        <FloatingCard
          className="-left-2 -top-4 sm:-left-4 sm:-top-5"
          Icon={ClockIcon}
          label="Expire bientôt"
          value="2 produits"
        />
        {/* Negative delay starts this card mid-cycle, so the two do not rise
            and fall in unison. */}
        <FloatingCard
          className="-bottom-4 -right-2 [animation-delay:-3.5s] sm:-bottom-5 sm:-right-4"
          Icon={LeafIcon}
          label="CO₂ économisé"
          value="5 Kg"
        />
      </Reveal>
    </section>
  )
}

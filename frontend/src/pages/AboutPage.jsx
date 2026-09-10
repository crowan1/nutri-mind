import { Link } from 'react-router-dom'

import Eyebrow from '../components/Eyebrow'
import { CalendarCheckIcon, FridgeIcon, PotIcon } from '../components/icons'
import Reveal from '../components/Reveal'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'

const INTRO =
  "Nutri'Mind est né d'un constat simple : nous jetons trop, souvent sans le vouloir. Notre mission est de transformer chaque foyer en allié du zéro déchet, sans effort et sans culpabilité."

const PROBLEM =
  "En France, une grande partie du gaspillage alimentaire a lieu directement à la maison : produits oubliés au fond du frigo, dates dépassées, portions mal anticipées. Pourtant, l'essentiel pourrait être évité avec un peu d'organisation."

const problemFigures = [
  {
    value: '10 Mt',
    caption: 'de nourriture gaspillée chaque année en France, tous acteurs confondus.',
  },
  {
    value: '30 kg',
    caption: 'jetés par personne et par an à la maison, dont 7 kg encore emballés.',
  },
]

const features = [
  {
    Icon: FridgeIcon,
    title: 'Inventaire intelligent',
    description:
      "Gardez un œil sur tout ce que vous avez - frigo, congélateur, placard, épices - et soyez prévenu avant qu'un produit ne se perde.",
  },
  {
    Icon: PotIcon,
    title: 'Recettes anti-gaspi',
    description:
      "Des idées de recettes générées à partir de ce qu'il vous reste, en priorisant les produits qui expirent bientôt.",
  },
  {
    Icon: CalendarCheckIcon,
    title: 'Planning & courses',
    description:
      'Planifiez vos repas de la semaine et générez automatiquement une liste de courses qui évite les achats en double.',
  },
]

const values = [
  {
    title: 'Sans culpabilité',
    description:
      'On ne fait pas la morale. On aide, on encourage, on célèbre chaque petit geste qui compte.',
  },
  {
    title: 'Sans effort',
    description:
      "L'outil s'adapte à votre quotidien, pas l'inverse. Quelques secondes suffisent pour en tirer parti.",
  },
  {
    title: 'Avec impact',
    description:
      "Moins de gaspillage, c'est des économies pour vous et un vrai geste pour la planète.",
  },
]

const stats = [
  { value: '-40%', caption: 'de gaspillage en moyenne chez nos utilisateurs' },
  { value: '12 000', caption: "foyers déjà engagés avec Nutri'Mind" },
  { value: '4,8 / 5', caption: 'note moyenne de satisfaction' },
]

const CTA_LEAD =
  'Rejoignez les milliers de foyers qui cuisinent mieux, dépensent moins et jettent presque plus rien.'

function AboutHero() {
  return (
    <section className="border-b border-line px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
      <Reveal>
        <Eyebrow>Notre raison d&apos;être</Eyebrow>
      </Reveal>

      <Reveal
        as="h1"
        delay={80}
        className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
      >
        Pour une cuisine <span className="text-brand">sans gaspillage</span>.
      </Reveal>

      <Reveal
        as="p"
        delay={160}
        className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted sm:mt-7"
      >
        {INTRO}
      </Reveal>
    </section>
  )
}

function Problem() {
  return (
    <section className="grid gap-10 bg-mint px-6 py-16 sm:gap-12 sm:px-10 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-16">
      <Reveal>
        <Eyebrow>Le problème</Eyebrow>

        <h2 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
          Chaque année, des montagnes de nourriture{' '}
          <span className="text-brand">finissent à la poubelle</span>.
        </h2>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{PROBLEM}</p>
      </Reveal>

      <div className="space-y-5">
        {problemFigures.map(({ value, caption }, index) => (
          <Reveal key={value} delay={index * 120}>
            <div className="rounded-xl bg-white p-6 ring-1 ring-line/70 transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-7 motion-reduce:transition-none">
              <p className="text-3xl font-extrabold tracking-tight text-danger sm:text-4xl">
                {value}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted">{caption}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Solution() {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
      <Reveal>
        <Eyebrow>Notre solution</Eyebrow>

        <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
          Un assistant qui veille sur votre cuisine.
        </h2>
      </Reveal>

      <ul className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3">
        {features.map(({ Icon, title, description }, index) => (
          <Reveal as="li" key={title} delay={index * 120}>
            <div className="group h-full rounded-xl bg-white p-6 ring-1 ring-line/70 transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-7 motion-reduce:transition-none">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-lg text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function Values() {
  return (
    <section className="bg-mint px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
      <Reveal>
        <Eyebrow>Nos valeurs</Eyebrow>

        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Simple, bienveillant, utile.
        </h2>
      </Reveal>

      <ul className="mt-10 grid gap-10 sm:mt-12 md:grid-cols-3">
        {values.map(({ title, description }, index) => (
          <Reveal as="li" key={title} delay={index * 120}>
            <h3 className="text-center text-lg text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function Stats() {
  return (
    <section className="px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16">
      <dl className="grid gap-10 text-center sm:gap-12 md:grid-cols-3">
        {stats.map(({ value, caption }, index) => (
          <Reveal key={value} delay={index * 120}>
            <dd className="text-4xl font-extrabold tracking-tight text-brand sm:text-5xl">
              {value}
            </dd>
            <dt className="mx-auto mt-4 max-w-[16rem] text-xs leading-relaxed text-muted">
              {caption}
            </dt>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="relative isolate overflow-hidden rounded-2xl bg-night px-5 py-16 text-center sm:px-8 sm:py-20">
        {/* Halo vert diffus en haut de la carte, comme sur la maquette. */}
        <div
          className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(22,163,74,0.42),transparent_72%)]"
          aria-hidden="true"
        />

        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Prêts à ne plus <span className="text-brand">gaspiller</span> ?
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/70">{CTA_LEAD}</p>

        <div className="mt-9 flex flex-wrap justify-center gap-3 text-sm">
          <Link
            to={routes.register}
            className="rounded-lg bg-brand px-5 py-3 font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 motion-reduce:transition-none"
          >
            Commencer gratuitement
          </Link>
          <Link
            to={routes.home}
            className="rounded-lg border border-white/25 px-5 py-3 font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0 motion-reduce:transition-none"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

export default function AboutPage() {
  usePageTitle('À propos')

  return (
    <>
      <AboutHero />
      <Problem />
      <Solution />
      <Values />
      <Stats />
      <CallToAction />
    </>
  )
}

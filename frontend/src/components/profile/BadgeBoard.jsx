import {
  CalendarCheckIcon,
  CoinIcon,
  FlameIcon,
  FridgeIcon,
  GlobeIcon,
  LeafIcon,
  PotIcon,
  TrophyIcon,
  UserIcon,
} from '../icons'

// None of this is backed by the API yet: there is no waste log, no streak
// counter and no badge table server-side. The figures are frozen so the
// screen can be reviewed, and each list is one constant to replace once those
// tables exist.
const STREAK = { days: 18, unlocked: 6, total: 12 }

// `tone` pairs a background with the ink of the icon sitting on it, so the
// two can never drift into an unreadable combination.
const BADGES = [
  {
    name: 'Premier pas',
    detail: 'Profil complété',
    icon: UserIcon,
    tone: 'bg-brand-soft text-brand',
    earned: true,
  },
  {
    name: 'Zéro déchet',
    detail: '7 jours sans gaspi',
    icon: LeafIcon,
    tone: 'bg-brand-soft text-brand',
    earned: true,
  },
  {
    name: 'Apprenti chef',
    detail: '10 recettes cuisinées',
    icon: PotIcon,
    tone: 'bg-amber-100 text-amber-700',
    earned: true,
  },
  {
    name: 'Économe',
    detail: '50 € économisés',
    icon: CoinIcon,
    tone: 'bg-amber-100 text-amber-700',
    earned: true,
  },
  {
    name: 'Anti-gâchis',
    detail: 'Congelé avant péremption',
    icon: FridgeIcon,
    tone: 'bg-sky-100 text-sky-700',
    earned: true,
  },
  {
    name: 'Organisé',
    detail: '1 semaine planifiée',
    icon: CalendarCheckIcon,
    tone: 'bg-violet-100 text-violet-700',
    earned: true,
  },
  {
    name: 'En feu',
    detail: '30 jours d’affilée',
    icon: FlameIcon,
    tone: 'bg-line text-muted',
    earned: false,
  },
  {
    name: 'Éco-héros',
    detail: '20 kg de CO₂ évités',
    icon: GlobeIcon,
    tone: 'bg-line text-muted',
    earned: false,
  },
]

const HISTORY = [
  {
    title: 'Badge « Économe » débloqué',
    detail: 'Vous avez économisé 50 € grâce à Nutri’Mind.',
    when: 'Hier',
    icon: CoinIcon,
    tone: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Recette cuisinée : Omelette aux épinards',
    detail: '2 produits sauvés de la péremption.',
    when: 'Il y a 2 j',
    icon: PotIcon,
    tone: 'bg-brand-soft text-brand',
  },
  {
    title: 'Produit congelé à temps',
    detail: 'Filet de cabillaud congelé avant la date limite.',
    when: 'Il y a 4 j',
    icon: FridgeIcon,
    tone: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Série de 7 jours sans gaspillage',
    detail: 'Badge « Zéro déchet » débloqué.',
    when: 'Il y a 1 sem.',
    icon: LeafIcon,
    tone: 'bg-violet-100 text-violet-700',
  },
]

export default function BadgeBoard() {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-5 py-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <FlameIcon className="size-5" />
          </span>
          <span>
            <span className="block text-2xl font-extrabold text-ink">{STREAK.days} jours</span>
            <span className="block text-xs text-muted">Série sans rien jeter</span>
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-mint px-5 py-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <TrophyIcon className="size-5" />
          </span>
          <span>
            <span className="block text-2xl font-extrabold text-ink">
              {STREAK.unlocked} / {STREAK.total}
            </span>
            <span className="block text-xs text-muted">Badges débloqués</span>
          </span>
        </div>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map(({ name, detail, icon: Icon, tone, earned }) => (
          <li
            key={name}
            className={`rounded-2xl border border-line p-4 text-center transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 motion-reduce:transform-none motion-reduce:transition-none ${
              earned ? 'bg-white' : 'bg-page opacity-60'
            }`}
          >
            <span
              className={`mx-auto flex size-11 items-center justify-center rounded-full ${tone}`}
            >
              <Icon className="size-6" />
            </span>
            <p className="mt-3 text-sm font-medium text-ink">{name}</p>
            <p className="mt-1 text-xs text-muted">{detail}</p>
            {!earned && <p className="sr-only">Badge non débloqué</p>}
          </li>
        ))}
      </ul>

      <ul className="mt-5 divide-y divide-line">
        {HISTORY.map(({ title, detail, when, icon: Icon, tone }) => (
          <li key={title} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
            <span
              className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${tone}`}
            >
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-ink">{title}</span>
              <span className="mt-0.5 block text-xs text-muted">{detail}</span>
            </span>
            <span className="shrink-0 text-xs text-muted">{when}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

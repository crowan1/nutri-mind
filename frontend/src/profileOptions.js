import {
  AirFryerIcon,
  BlenderIcon,
  ClockIcon,
  CoffeeIcon,
  CoinIcon,
  DumbbellIcon,
  HeartIcon,
  KettleIcon,
  LeafIcon,
  MicrowaveIcon,
  OvenIcon,
  PanIcon,
  PotIcon,
  ScaleIcon,
  StandMixerIcon,
  SteamerIcon,
  StoveIcon,
  ToasterIcon,
} from './components/icons'

// The server stores every profile vocabulary as an English slug (see the enums
// under app/Enums): the values are keys, and this file is the only place that
// turns them into something a French reader sees. Adding a case server-side
// without adding it here shows the raw slug, which is the point — it fails
// visibly rather than silently dropping the option.
//
// The tiles also carry their picture here rather than in the component that
// draws them: an option is its label, its icon and its colour together, and
// splitting those across two files is how one ends up out of step with the
// others.

export const SEXES = [
  { value: 'female', label: 'Femme' },
  { value: 'male', label: 'Homme' },
  { value: 'other', label: 'Autre' },
]

export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sédentaire' },
  { value: 'light', label: 'Léger' },
  { value: 'moderate', label: 'Modéré' },
  { value: 'active', label: 'Actif' },
  { value: 'athlete', label: 'Sportif' },
]

export const COOKING_LEVELS = [
  { value: 'beginner', label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'advanced', label: 'Confirmé' },
]

export const DIETS = [
  { value: 'omnivore', label: 'Omnivore' },
  { value: 'flexitarian', label: 'Flexitarien' },
  { value: 'vegetarian', label: 'Végétarien' },
  { value: 'vegan', label: 'Végan' },
  { value: 'pescatarian', label: 'Pescétarien' },
  { value: 'keto', label: 'Cétogène' },
  { value: 'gluten-free', label: 'Sans gluten' },
  { value: 'halal', label: 'Halal' },
]

export const ALLERGENS = [
  { value: 'gluten', label: 'Gluten' },
  { value: 'lactose', label: 'Lactose' },
  { value: 'peanuts', label: 'Arachides' },
  { value: 'tree-nuts', label: 'Fruits à coque' },
  { value: 'eggs', label: 'Œufs' },
  { value: 'fish', label: 'Poisson' },
  { value: 'shellfish', label: 'Crustacés' },
  { value: 'soy', label: 'Soja' },
  { value: 'sesame', label: 'Sésame' },
  { value: 'mustard', label: 'Moutarde' },
]

// `tone` pairs the swatch colour with the ink of the icon on it, so the two
// can never drift into an unreadable combination. Six different tones because
// the goals are scanned by shape and colour before they are read.
export const GOALS = [
  {
    value: 'zero-waste',
    label: 'Zéro gaspillage',
    caption: 'Jeter moins, consommer mieux.',
    icon: LeafIcon,
    tone: 'bg-brand-soft text-brand',
  },
  {
    value: 'save-money',
    label: 'Économiser',
    caption: 'Réduire le budget courses.',
    icon: CoinIcon,
    tone: 'bg-amber-100 text-amber-700',
  },
  {
    value: 'lose-weight',
    label: 'Perdre du poids',
    caption: 'Suivi des calories & portions.',
    icon: ScaleIcon,
    tone: 'bg-rose-100 text-rose-700',
  },
  {
    value: 'eat-healthier',
    label: 'Manger plus sain',
    caption: 'Plus d’équilibre au quotidien.',
    icon: HeartIcon,
    tone: 'bg-sky-100 text-sky-700',
  },
  {
    value: 'save-time',
    label: 'Gagner du temps',
    caption: 'Repas planifiés, courses malines.',
    icon: ClockIcon,
    tone: 'bg-violet-100 text-violet-700',
  },
  {
    value: 'gain-muscle',
    label: 'Prise de masse',
    caption: 'Plus de protéines & d’apports.',
    icon: DumbbellIcon,
    tone: 'bg-orange-100 text-orange-700',
  },
]

// One tone for the lot, unlike the goals: twelve appliances picked out in
// twelve colours would be a paint chart, and here the icon alone identifies
// the entry.
export const EQUIPMENT = [
  { value: 'oven', label: 'Four', icon: OvenIcon },
  { value: 'microwave', label: 'Micro-ondes', icon: MicrowaveIcon },
  { value: 'stove', label: 'Plaque / cuisinière', icon: StoveIcon },
  { value: 'blender', label: 'Mixeur / blender', icon: BlenderIcon },
  { value: 'stand-mixer', label: 'Robot pâtissier', icon: StandMixerIcon },
  { value: 'air-fryer', label: 'Friteuse à air', icon: AirFryerIcon },
  { value: 'steamer', label: 'Cuiseur vapeur', icon: SteamerIcon },
  { value: 'pressure-cooker', label: 'Autocuiseur', icon: PotIcon },
  { value: 'toaster', label: 'Grille-pain', icon: ToasterIcon },
  { value: 'kettle', label: 'Bouilloire', icon: KettleIcon },
  { value: 'coffee-machine', label: 'Machine à café', icon: CoffeeIcon },
  { value: 'crepe-pan', label: 'Crêpière / grill', icon: PanIcon },
]

export const NOTIFICATIONS = [
  {
    value: 'expiry-alerts',
    label: 'Alertes de péremption',
    caption: 'Avant qu’un produit ne soit perdu.',
  },
  {
    value: 'recipe-suggestions',
    label: 'Suggestions de recettes',
    caption: 'Idées basées sur votre inventaire.',
  },
  {
    value: 'shopping-reminder',
    label: 'Rappel de courses',
    caption: 'Avant vos jours de courses habituels.',
  },
  {
    value: 'weekly-report',
    label: 'Bilan hebdomadaire anti-gaspi',
    caption: 'Votre impact résumé chaque dimanche.',
  },
]

export const labelOf = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value

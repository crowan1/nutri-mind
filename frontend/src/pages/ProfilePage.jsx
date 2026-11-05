import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  AlertIcon,
  BanIcon,
  BellIcon,
  HomeIcon,
  LeafIcon,
  OvenIcon,
  ScaleIcon,
  TargetIcon,
  TrophyIcon,
  UserIcon,
} from '../components/icons'
import BadgeBoard from '../components/profile/BadgeBoard'
import ChipGroup from '../components/profile/ChipGroup'
import CompletionMeter from '../components/profile/CompletionMeter'
import Field from '../components/profile/Field'
import FreeTagField from '../components/profile/FreeTagField'
import ProfileCard from '../components/profile/ProfileCard'
import ProfileSkeleton from '../components/profile/ProfileSkeleton'
import SegmentedControl from '../components/profile/SegmentedControl'
import SelectField from '../components/profile/SelectField'
import Stepper from '../components/profile/Stepper'
import Switch from '../components/profile/Switch'
import TileGroup from '../components/profile/TileGroup'
import Reveal from '../components/Reveal'
import { useAuth } from '../context/AuthContext'
import { fetchProfile, fetchUserRecipes, updateProfile } from '../lib/api'
import {
  ACTIVITY_LEVELS,
  ALLERGENS,
  COOKING_LEVELS,
  DIETS,
  EQUIPMENT,
  GOALS,
  NOTIFICATIONS,
  SEXES,
} from '../profileOptions'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'
import { showErrorToast, showSuccessToast } from '../utils/Toast'
import { userDisplayName, userInitial } from '../utils/User'

// Columns the server stores as numbers. The inputs hand back strings, and an
// empty one has to reach the API as null rather than as 0 or "".
const NUMERIC_FIELDS = ['height_cm', 'start_weight_kg', 'target_weight_kg', 'weekly_budget']

// Same idea for the fields whose empty value is "not set" rather than "".
const OPTIONAL_FIELDS = ['birth_date', 'sex', 'activity_level', 'diet']

// What the completion meter counts. Deliberately not every column: the weight
// goals only apply to the people who track them, and a profile should be able
// to reach 100% without them.
const COMPLETION_CHECKS = [
  (form) => Boolean(form.first_name),
  (form) => Boolean(form.last_name),
  (form) => Boolean(form.email),
  (form) => Boolean(form.birth_date),
  (form) => Boolean(form.sex),
  (form) => Boolean(form.height_cm),
  (form) => Boolean(form.diet),
  (form) => form.goals.length > 0,
  (form) => form.equipment.length > 0,
  (form) => Boolean(form.weekly_budget),
]

const MEMBER_SINCE_FORMAT = { month: 'long', year: 'numeric' }

// The profile arrives as the user record with its `profile` relation attached;
// the form flattens the two because the screen edits them as one thing.
function toForm(user) {
  const profile = user?.profile ?? {}

  return {
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    email: user?.email ?? '',
    birth_date: profile.birth_date ?? '',
    sex: profile.sex ?? '',

    calorie_tracking: Boolean(profile.calorie_tracking),
    height_cm: profile.height_cm ?? '',
    activity_level: profile.activity_level ?? '',
    start_weight_kg: profile.start_weight_kg ?? '',
    target_weight_kg: profile.target_weight_kg ?? '',

    diet: profile.diet ?? '',
    allergies: profile.allergies ?? [],
    goals: profile.goals ?? [],
    equipment: profile.equipment ?? [],
    disliked_foods: profile.disliked_foods ?? [],

    notifications: Object.fromEntries(
      NOTIFICATIONS.map(({ value }) => [value, Boolean(profile.notifications?.[value])]),
    ),

    household_size: profile.household_size ?? 1,
    weekly_budget: profile.weekly_budget ?? '',
    cooking_level: profile.cooking_level ?? 'beginner',
  }
}

function toPayload(form) {
  const payload = { ...form }

  for (const key of NUMERIC_FIELDS) {
    payload[key] = form[key] === '' ? null : Number(form[key])
  }

  for (const key of OPTIONAL_FIELDS) {
    payload[key] = form[key] || null
  }

  return payload
}

export default function ProfilePage() {
  usePageTitle('Mon profil')

  const { user, refreshUser, signOut } = useAuth()
  const navigate = useNavigate()

  // The session check already carries the account and its profile, so the
  // form starts from it. The request below is still worth making: it is what
  // creates the profile row for an account that predates the table, and it is
  // the authoritative copy if the session one has gone stale.
  const [account, setAccount] = useState(user)
  const [form, setForm] = useState(() => toForm(user))
  // Kept beside the form so "has anything changed" is a comparison rather than
  // a flag every control has to remember to raise.
  const [saved, setSaved] = useState(() => toForm(user))
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [recipeCount, setRecipeCount] = useState(null)
  const [weightUnlocked, setWeightUnlocked] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetchProfile()
      .then((response) => {
        if (cancelled) return

        setAccount(response.data)
        setForm(toForm(response.data))
        setSaved(toForm(response.data))
      })
      .catch(() => {
        // The form stays on the session copy rather than going blank: every
        // field it holds is still the user's, just possibly a reload old.
        if (!cancelled) showErrorToast('Erreur lors de la récupération du profil.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!user?.id) return

    let cancelled = false

    fetchUserRecipes(user.id)
      .then((response) => {
        if (!cancelled) setRecipeCount((response.data ?? []).length)
      })
      .catch(() => {
        if (!cancelled) setRecipeCount(0)
      })

    return () => {
      cancelled = true
    }
  }, [user?.id])

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved])

  const completion = useMemo(() => {
    const filled = COMPLETION_CHECKS.filter((check) => check(form)).length
    return Math.round((filled / COMPLETION_CHECKS.length) * 100)
  }, [form])

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
    // The server's complaint about a field stops applying the moment it is
    // edited; leaving it up would be stale by the next keystroke.
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (saving || !dirty) return

    setSaving(true)
    setErrors({})

    try {
      const response = await updateProfile(toPayload(form))
      const next = toForm(response.data)

      setAccount(response.data)
      setForm(next)
      setSaved(next)
      setWeightUnlocked(false)

      // The sidebar shows the name and the email, so the session copy has to
      // follow the save rather than wait for the next reload.
      await refreshUser()

      showSuccessToast('Profil enregistré.')
    } catch (error) {
      // Laravel sends one array of messages per field; only the first is worth
      // showing under an input.
      const fieldErrors = Object.fromEntries(
        Object.entries(error?.errors ?? {}).map(([key, messages]) => [key, messages[0]]),
      )

      setErrors(fieldErrors)
      showErrorToast(error?.message ?? 'Erreur lors de l’enregistrement du profil.')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    if (signingOut) return

    setSigningOut(true)
    await signOut()
    navigate(routes.home)
  }

  const memberSince = account?.created_at
    ? new Date(account.created_at).toLocaleDateString('fr-FR', MEMBER_SINCE_FORMAT)
    : null

  // A starting weight is the reference every later comparison is drawn
  // against, so it stays locked once set: editing it silently rewrites the
  // history. The pill unlocks it for the current visit when that is on purpose.
  const startWeightLocked = Boolean(saved?.start_weight_kg) && !weightUnlocked

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <Reveal>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Mon profil
          </h1>
          <p className="mt-1 text-sm text-muted">
            Personnalisez Nutri&apos;Mind selon vos besoins, votre cuisine et vos objectifs.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <button
            type="button"
            onClick={handleLogout}
            disabled={signingOut}
            className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink transition duration-200 hover:border-danger/40 hover:text-danger disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
          >
            Se déconnecter
          </button>
        </Reveal>
      </div>

      {loading ? (
        <ProfileSkeleton />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-7 grid items-start gap-5 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]"
        >
          {/* Left rail: who the account is, and what it has produced. Read
              only — nothing here is a form control. */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-6">
            <Reveal className="rounded-2xl border border-line bg-white p-6 text-center">
              <span className="relative inline-flex">
                <span className="flex size-20 items-center justify-center rounded-full bg-brand text-3xl font-semibold text-white">
                  {userInitial(account)}
                </span>
                <span className="absolute right-0 bottom-1 size-5 rounded-full border-2 border-white bg-night" />
              </span>

              <p className="mt-4 text-lg font-bold text-ink">{userDisplayName(account)}</p>
              <p className="mt-1 truncate text-xs text-muted">{account?.email}</p>

              {memberSince && (
                <p className="mt-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
                  Membre depuis {memberSince}
                </p>
              )}
            </Reveal>

            <Reveal delay={120}>
              <CompletionMeter percent={completion} />
            </Reveal>

            {/* Three of these four have no table behind them yet — no waste
                log, no CO₂ ledger, no savings. Only the recipe count is real.
                Frozen until those exist. */}
            <Reveal
              delay={200}
              className="grid grid-cols-2 divide-x divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white"
            >
              {[
                { value: '5 Kg', label: 'CO₂ économisé' },
                { value: '2%', label: 'Taux de gaspillage' },
                { value: '38 €', label: 'Économisés ce mois' },
                {
                  value: recipeCount === null ? '—' : recipeCount,
                  label: 'Recettes enregistrées',
                },
              ].map(({ value, label }) => (
                <div key={label} className="p-5">
                  <p className="text-2xl font-extrabold text-ink">{value}</p>
                  <p className="mt-1 text-xs text-muted">{label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <ProfileCard
              icon={UserIcon}
              title="Informations personnelles"
              description="Vos informations de base. Elles restent privées."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="first-name"
                  label="Prénom"
                  value={form.first_name}
                  autoComplete="given-name"
                  onChange={(event) => update('first_name', event.target.value)}
                  hint={errors.first_name}
                />
                <Field
                  id="last-name"
                  label="Nom"
                  value={form.last_name}
                  autoComplete="family-name"
                  onChange={(event) => update('last_name', event.target.value)}
                  hint={errors.last_name}
                />
                <Field
                  id="birth-date"
                  label="Date de naissance"
                  type="date"
                  value={form.birth_date}
                  onChange={(event) => update('birth_date', event.target.value)}
                  hint={errors.birth_date}
                />
                <SelectField
                  id="sex"
                  label="Sexe"
                  note="pour le calcul calorique"
                  placeholder="Non précisé"
                  options={SEXES}
                  value={form.sex}
                  onChange={(event) => update('sex', event.target.value)}
                />
                <div className="sm:col-span-2">
                  <Field
                    id="email"
                    label="Adresse e-mail"
                    type="email"
                    value={form.email}
                    autoComplete="email"
                    onChange={(event) => update('email', event.target.value)}
                    hint={errors.email}
                  />
                </div>
              </div>
            </ProfileCard>

            <ProfileCard
              icon={ScaleIcon}
              title="Suivi du poids & calories"
              description="Activez le suivi pour une estimation calorique et un objectif de poids."
            >
              <Switch
                label="Activer le suivi calorimétrique"
                caption="Nutri'Mind estimera vos besoins et adaptera les portions."
                checked={form.calorie_tracking}
                onChange={(checked) => update('calorie_tracking', checked)}
              />

              {/* Collapsed rather than hidden: the fields only mean something
                  once the tracking is on, and sliding them in says so. The
                  0fr/1fr grid is what lets an unknown height animate. */}
              <div
                aria-hidden={!form.calorie_tracking}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                  form.calorie_tracking ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-4 pt-5 sm:grid-cols-2">
                    <Field
                      id="height"
                      label="Taille"
                      type="number"
                      inputMode="numeric"
                      min="50"
                      max="260"
                      suffix="cm"
                      value={form.height_cm}
                      disabled={!form.calorie_tracking}
                      onChange={(event) => update('height_cm', event.target.value)}
                      hint={errors.height_cm}
                    />
                    <SelectField
                      id="activity-level"
                      label="Niveau d'activité"
                      placeholder="Non précisé"
                      options={ACTIVITY_LEVELS}
                      value={form.activity_level}
                      disabled={!form.calorie_tracking}
                      onChange={(event) => update('activity_level', event.target.value)}
                    />

                    <Field
                      id="start-weight"
                      label="Poids de départ"
                      note="référence des stats"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      min="20"
                      max="400"
                      suffix="kg"
                      value={form.start_weight_kg}
                      locked={startWeightLocked}
                      onChange={(event) => update('start_weight_kg', event.target.value)}
                      hint={errors.start_weight_kg}
                      action={
                        Boolean(saved?.start_weight_kg) && (
                          <button
                            type="button"
                            onClick={() => setWeightUnlocked((current) => !current)}
                            className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted transition duration-200 hover:border-brand/40 hover:text-brand motion-reduce:transition-none"
                          >
                            {startWeightLocked ? 'Verrouillé' : 'Déverrouillé'}
                          </button>
                        )
                      }
                    />

                    <Field
                      id="target-weight"
                      label="Poids objectif"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      min="20"
                      max="400"
                      suffix="kg"
                      value={form.target_weight_kg}
                      disabled={!form.calorie_tracking}
                      onChange={(event) => update('target_weight_kg', event.target.value)}
                      hint={errors.target_weight_kg}
                    />

                    <div className="sm:col-span-2">
                      <Field
                        id="current-weight"
                        label="Poids actuel"
                        note="mis à jour automatiquement"
                        suffix="kg"
                        locked
                        readOnly
                        value={account?.profile?.current_weight_kg ?? ''}
                        placeholder="Aucune pesée"
                      />
                      <p className="mt-2 text-xs text-muted">
                        Calculé d&apos;après votre dernière pesée.{' '}
                        <Link
                          to={routes.health}
                          className="font-medium text-brand underline underline-offset-2"
                        >
                          Ajouter une mesure dans Forme
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ProfileCard>

            <ProfileCard
              icon={LeafIcon}
              title="Régime alimentaire"
              description="Choisissez votre régime principal — il filtre toutes vos recettes."
            >
              <ChipGroup
                label="Régime alimentaire"
                options={DIETS}
                value={form.diet}
                onChange={(value) => update('diet', value)}
              />
            </ProfileCard>

            <ProfileCard
              icon={AlertIcon}
              title="Allergies & intolérances"
              description="Sélectionnez vos allergènes — ils seront exclus de vos suggestions."
            >
              <ChipGroup
                label="Allergies et intolérances"
                options={ALLERGENS}
                value={form.allergies}
                multiple
                onChange={(value) => update('allergies', value)}
              />
            </ProfileCard>

            <ProfileCard
              icon={TargetIcon}
              title="Vos objectifs"
              description="Que voulez-vous accomplir avec Nutri'Mind ? Plusieurs choix possibles."
            >
              <TileGroup
                label="Vos objectifs"
                options={GOALS}
                value={form.goals}
                columns="sm:grid-cols-2 lg:grid-cols-3"
                onChange={(value) => update('goals', value)}
              />
            </ProfileCard>

            <ProfileCard
              icon={OvenIcon}
              title="Équipement de cuisine"
              description="Indiquez votre électroménager : on ne vous proposera que des recettes réalisables."
            >
              <TileGroup
                label="Équipement de cuisine"
                options={EQUIPMENT}
                value={form.equipment}
                columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                onChange={(value) => update('equipment', value)}
              />
            </ProfileCard>

            <ProfileCard
              icon={HomeIcon}
              title="Foyer & habitudes"
              description="Pour ajuster les portions, les listes de courses et la difficulté des recettes."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Stepper
                  id="household-size"
                  label="Personnes dans le foyer"
                  value={form.household_size}
                  onChange={(value) => update('household_size', value)}
                />
                <Field
                  id="weekly-budget"
                  label="Budget courses hebdomadaire"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="2000"
                  suffix="€ / sem."
                  value={form.weekly_budget}
                  onChange={(event) => update('weekly_budget', event.target.value)}
                  hint={errors.weekly_budget}
                />
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium text-ink">Niveau en cuisine</p>
                <div className="mt-2">
                  <SegmentedControl
                    label="Niveau en cuisine"
                    options={COOKING_LEVELS}
                    value={form.cooking_level}
                    onChange={(value) => update('cooking_level', value)}
                  />
                </div>
              </div>
            </ProfileCard>

            <ProfileCard
              icon={BanIcon}
              title="Aliments à éviter"
              description="Au-delà des allergies : ce que vous n'aimez tout simplement pas."
            >
              <FreeTagField
                label="Aliments à éviter"
                placeholder="Champignons..."
                value={form.disliked_foods}
                onChange={(value) => update('disliked_foods', value)}
              />
            </ProfileCard>

            <ProfileCard
              icon={BellIcon}
              title="Notifications"
              description="Choisissez ce dont Nutri'Mind doit vous avertir."
            >
              <div className="flex flex-col divide-y divide-line">
                {NOTIFICATIONS.map(({ value, label, caption }) => (
                  <div key={value} className="py-3.5 first:pt-0 last:pb-0">
                    <Switch
                      label={label}
                      caption={caption}
                      checked={form.notifications[value]}
                      onChange={(checked) =>
                        update('notifications', { ...form.notifications, [value]: checked })
                      }
                    />
                  </div>
                ))}
              </div>
            </ProfileCard>

            <ProfileCard
              icon={TrophyIcon}
              title="Historique & badges"
              description="Vos paliers anti-gaspi et votre progression au fil du temps."
            >
              <BadgeBoard />
            </ProfileCard>

            {/* Sticks to the bottom of the viewport: the form is long enough
                that a save button living only at its end would be out of reach
                from most of it. Frosted rather than solid so the section it
                covers stays legible underneath — the bar has to read as
                floating above the form, not as a slice cut out of it. The
                opaque background is the base and the translucent one is the
                upgrade: a browser without backdrop-filter would otherwise be
                left with unreadable text over the content. */}
            <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-[0_10px_36px_rgba(20,20,15,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-white/40 supports-backdrop-filter:bg-linear-to-br supports-backdrop-filter:from-white/40 supports-backdrop-filter:to-brand-soft/25 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-200">
              <p aria-live="polite" className="text-xs text-muted">
                {saving
                  ? 'Enregistrement en cours...'
                  : dirty
                    ? 'Modifications non enregistrées.'
                    : 'Toutes vos modifications sont enregistrées.'}
              </p>

              <button
                type="submit"
                disabled={!dirty || saving}
                className="rounded-xl bg-brand px-6 py-2.5 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-90 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

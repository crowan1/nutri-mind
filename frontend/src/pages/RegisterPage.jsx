import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthField from '../components/AuthField'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'
import { register } from '../lib/api'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'

export default function RegisterPage() {
  usePageTitle('Inscription')

  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [form, setForm] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function updateField(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setErrors({})

    try {
      const { user } = await register(form)
      signIn(user)
      navigate(routes.dashboard)
    } catch (error) {
      setErrors(error.errors ?? { email: error.message ?? 'Une erreur est survenue.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout mode="register">
      <h1 className="text-2xl font-bold tracking-tight">Inscription</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Inscrivez-vous à l&apos;aide de votre adresse e-mail et votre mot de passe.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="email"
          label="Adresse e-mail"
          type="email"
          autoComplete="email"
          placeholder="john.doe@gmail.com"
          value={form.email}
          onChange={updateField('email')}
          error={errors.email?.[0] ?? errors.email}
          required
        />

        <AuthField
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="new-password"
          placeholder="Votre mot de passe..."
          value={form.password}
          onChange={updateField('password')}
          error={errors.password?.[0] ?? errors.password}
          required
        />

        <AuthField
          id="password_confirmation"
          label="Confirmez le mot de passe"
          type="password"
          autoComplete="new-password"
          placeholder="Votre mot de passe..."
          value={form.password_confirmation}
          onChange={updateField('password_confirmation')}
          error={errors.password_confirmation?.[0] ?? errors.password_confirmation}
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-brand px-4 py-3.5 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted invisible" aria-hidden="true">
        Mot de passe oublié ?
      </p>
    </AuthLayout>
  )
}

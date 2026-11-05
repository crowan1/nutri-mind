import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthField from '../components/AuthField'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'
import { firstErrorMessage, login } from '../lib/api'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'
import { showErrorToast } from '../utils/Toast'

export default function LoginPage() {
  usePageTitle('Connexion')

  const navigate = useNavigate()
  const { signIn, runTransition } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Nothing to send until both are filled, and a request that can only come
  // back as a validation error is a round trip spent to tell the user what the
  // form already knows.
  const incomplete = !form.email.trim() || !form.password

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
      // The whole trip runs under the preloader: request, sign-in and redirect.
      // It therefore lifts on a mounted dashboard rather than on the form.
      await runTransition(async () => {
        const { user } = await login(form)
        signIn(user)
        navigate(routes.dashboard)
      })
    } catch (error) {
      const message = firstErrorMessage(error)

      // Both, not one or the other: the toast is what the eye catches when the
      // button was the last thing looked at, and the inline message is what
      // stays next to the field once the toast has gone.
      setErrors(error.errors ?? { email: message })
      showErrorToast(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout mode="login">
      <h1 className="text-2xl font-bold tracking-tight">Connexion</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Connectez-vous à l&apos;aide de votre adresse e-mail et votre mot de passe.
      </p>

      <form className="mt-8 flex flex-1 flex-col gap-5" onSubmit={handleSubmit} noValidate>
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
          autoComplete="current-password"
          placeholder="Votre mot de passe..."
          value={form.password}
          onChange={updateField('password')}
          error={errors.password?.[0] ?? errors.password}
          required
        />

        <button
          type="submit"
          disabled={submitting || incomplete}
          className="mt-auto w-full rounded-lg bg-brand px-4 py-3.5 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Mot de passe oublié ?{' '}
        <Link to={routes.forgotPassword} className="font-medium text-brand hover:underline">
          Réinitialiser
        </Link>
      </p>
    </AuthLayout>
  )
}

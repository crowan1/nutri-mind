import { useState } from 'react'
import { Link } from 'react-router-dom'

import AuthField from '../components/AuthField'
import AuthLayout from '../components/AuthLayout'
import { sendPasswordResetLink } from '../lib/api'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'

export default function ForgotPasswordPage() {
  usePageTitle('Mot de passe oublié')

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setErrors({})
    setMessage('')

    try {
      const response = await sendPasswordResetLink(email)
      setMessage(response.message)
    } catch (error) {
      setErrors(error.errors ?? { email: error.message ?? 'Une erreur est survenue.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout mode="login">
      <h1 className="text-2xl font-bold tracking-tight">Mot de passe oublié</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="email"
          label="Adresse e-mail"
          type="email"
          autoComplete="email"
          placeholder="john.doe@gmail.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setErrors({})
          }}
          error={errors.email?.[0] ?? errors.email}
          required
        />

        {message ? <p className="text-sm text-brand">{message}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-brand px-4 py-3.5 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Envoi...' : 'Envoyer le lien'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        <Link to={routes.login} className="font-medium text-brand hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </AuthLayout>
  )
}

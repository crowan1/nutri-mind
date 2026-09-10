import { Link } from 'react-router-dom'

import { routes } from '../routes'

function AuthPanel({ mode }) {
  const isLogin = mode === 'login'

  return (
    <aside className="flex min-h-[22rem] flex-col bg-brand p-6 text-white sm:min-h-[24rem] sm:p-8 lg:h-full lg:min-h-0 lg:p-10">
      <Link to={routes.home} className="flex shrink-0 items-center gap-2.5">
        <img src="/favicon.svg" alt="" width="28" height="28" className="size-7" />
        <span className="text-lg font-bold tracking-tight">Nutri&apos;Mind</span>
      </Link>

      <div className="flex flex-1 flex-col justify-center py-6 sm:py-8">
        <h2 className="text-2xl font-bold tracking-tight">
          {isLogin ? 'Bon retour !' : 'Bienvenue !'}
        </h2>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/90">
          {isLogin
            ? 'Déjà un compte ? Connectez-vous pour retrouver votre inventaire et vos recettes.'
            : 'Pas encore de compte ? Rejoignez Nutri\'Mind en quelques secondes.'}
        </p>
      </div>

      <Link
        to={isLogin ? routes.register : routes.login}
        className="inline-flex w-full shrink-0 justify-center rounded-lg border border-white px-6 py-3 text-base font-medium transition hover:bg-white/10 lg:w-auto lg:self-start lg:py-2.5 lg:text-sm"
      >
        {isLogin ? "S'inscrire" : 'Se connecter'}
      </Link>
    </aside>
  )
}

function FormColumn({ children }) {
  return <div className="flex h-full flex-col p-6 sm:p-8 lg:p-10">{children}</div>
}

export default function AuthLayout({ mode, children }) {
  const isLogin = mode === 'login'

  return (
    <section className="border-b border-line px-4 py-8 sm:px-6 sm:py-14 lg:px-16 lg:py-16">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-line/70 sm:rounded-2xl lg:min-h-[36rem] lg:grid-cols-2 lg:items-stretch">
        {isLogin ? (
          <>
            <FormColumn>{children}</FormColumn>
            <AuthPanel mode="login" />
          </>
        ) : (
          <>
            <AuthPanel mode="register" />
            <FormColumn>{children}</FormColumn>
          </>
        )}
      </div>
    </section>
  )
}

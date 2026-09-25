import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { routes } from '../routes'

function AuthPanel({ mode, onLeft }) {
  const isLogin = mode === 'login'

  return (
    <aside
      className={`flex min-h-[22rem] flex-col bg-brand p-6 text-white transition-transform duration-300 ease-in-out motion-reduce:transition-none sm:min-h-[24rem] sm:p-8 lg:absolute lg:inset-y-0 lg:left-0 lg:z-10 lg:h-full lg:min-h-0 lg:w-1/2 lg:p-10 ${
        onLeft ? 'lg:translate-x-0' : 'lg:translate-x-full'
      } ${isLogin ? 'order-2' : 'order-1'} lg:order-none`}
    >
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
        // Tells the next screen which side the panel is leaving from. Without
        // it the panel has no starting position to slide out of.
        state={{ from: mode }}
        className="inline-flex w-full shrink-0 justify-center rounded-lg border border-white px-6 py-3 text-base font-medium transition hover:bg-white/10 lg:w-auto lg:self-start lg:py-2.5 lg:text-sm"
      >
        {isLogin ? "S'inscrire" : 'Se connecter'}
      </Link>
    </aside>
  )
}

function FormColumn({ isLogin, faded, children }) {
  return (
    <div
      className={`flex h-full flex-col p-6 transition-opacity duration-300 ease-out motion-reduce:transition-none sm:p-8 lg:p-10 ${
        isLogin ? 'order-1 lg:col-start-1' : 'order-2 lg:col-start-2'
      } ${faded ? 'lg:opacity-0' : 'lg:delay-100'}`}
    >
      {children}
    </div>
  )
}

export default function AuthLayout({ mode, children }) {
  const isLogin = mode === 'login'
  const { state } = useLocation()

  // Login and register are two separate routes, so switching between them
  // unmounts this layout and mounts a new one already in its final position --
  // a CSS transition would have nothing to interpolate from and the panel
  // would snap across. The switch link tags the navigation with the side it
  // came from, so the first frame can be painted there and the move animated.
  const from = state?.from
  const [settled, setSettled] = useState(from !== 'login' && from !== 'register')

  useEffect(() => {
    if (settled) return undefined

    // Two frames rather than one: the browser has to actually paint the
    // starting position, otherwise it collapses both class sets into a single
    // style recalculation and the panel jumps.
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setSettled(true))
    })

    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [settled])

  // The panel sits left on register and right on login. While sliding it
  // starts on the side the previous screen left it on, which is the opposite
  // one since there are only two.
  const panelOnLeft = settled ? !isLogin : isLogin

  return (
    <section className="border-b border-line px-4 py-8 sm:px-6 sm:py-14 lg:px-16 lg:py-16">
      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-line/70 sm:rounded-2xl lg:min-h-[36rem] lg:grid-cols-2 lg:items-stretch">
        <AuthPanel mode={mode} onLeft={panelOnLeft} />
        <FormColumn isLogin={isLogin} faded={!settled}>
          {children}
        </FormColumn>
      </div>
    </section>
  )
}

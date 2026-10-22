import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { routes } from '../routes'
import { userDisplayName, userInitial } from '../utils/User'
import ScrollReset from './ScrollReset'

const NAV_ITEMS = [
  { label: 'Accueil', to: routes.dashboard },
  { label: 'Inventaire', to: routes.inventory },
  { label: 'Recettes', to: routes.recipes },
  { label: 'Planning', to: routes.planning },
  { label: 'Forme', to: routes.health },
  { label: 'Profil', to: routes.profile },
]

function navClassName({ isActive }) {
  const base = 'block rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200'

  return isActive
    ? `${base} bg-brand-soft text-brand`
    : `${base} text-muted hover:bg-mint hover:text-ink`
}

// Shell for every signed-in page: the marketing header gives way to a
// persistent sidebar, so the product navigation stays put from screen to
// screen instead of being rebuilt by each page.
export default function AppLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)

  async function handleLogout() {
    if (signingOut) return

    setSigningOut(true)

    // signOut always resolves and always clears the session, so the redirect is
    // owed unconditionally.
    await signOut()
    navigate(routes.home)
  }

  return (
    <div className="min-h-svh bg-white text-ink">
      <ScrollReset />

      <div className="flex min-h-svh flex-col lg:flex-row">
        {/* Below lg the sidebar folds into a scrollable strip rather than
            eating the width of a phone screen. */}
        <aside className="flex shrink-0 flex-col border-line bg-white lg:sticky lg:top-0 lg:h-svh lg:w-60 lg:border-r">
          <div className="border-b border-line px-6 py-5 lg:border-b-0">
            <span className="flex items-center gap-2.5">
              <img src="/favicon.svg" alt="" width="28" height="28" className="size-7" />
              <span className="text-lg font-bold tracking-tight text-brand">Nutri&apos;Mind</span>
            </span>
            <p className="mt-1 text-xs text-muted lg:pl-10">Zéro gaspillage</p>
          </div>

          <nav className="flex gap-1 overflow-x-auto px-4 py-3 lg:mt-4 lg:flex-col lg:overflow-visible lg:py-0">
            {NAV_ITEMS.map(({ label, to }) => (
              <NavLink key={label} to={to} end={to === routes.dashboard} className={navClassName}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto hidden px-4 pb-4 lg:block">
            <p className="rounded-2xl bg-mint px-4 py-4 text-xs leading-relaxed text-muted">
              <span className="font-semibold text-ink">Astuce</span> — Consultez vos recettes
              suggérées pour utiliser vos produits bientôt périmés.
            </p>
          </div>

          {/* The button sits on its own row: at the sidebar's width a full
              "Déconnexion" next to the name would squeeze both. */}
          <div className="hidden flex-col gap-3 border-t border-line px-5 py-4 lg:flex">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                {userInitial(user)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-ink">
                  {userDisplayName(user)}
                </span>
                <span className="block truncate text-xs text-muted">{user?.email}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={signingOut}
              className="w-full rounded-xl border border-line px-4 py-2 text-xs font-medium text-muted transition duration-200 hover:border-danger/40 hover:text-danger disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
            >
              {signingOut ? 'Déconnexion...' : 'Déconnexion'}
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 bg-page px-5 py-6 sm:px-8 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

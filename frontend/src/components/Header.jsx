import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { routes } from '../routes'
import Logo from './Logo'
import MobileMenu from './MobileMenu'

const linkClassName =
  'relative text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 motion-reduce:after:transition-none'

export default function Header() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const navLinks = user
    ? [
        { label: 'À propos', to: routes.about },
        { label: 'Tableau de bord', to: routes.dashboard },
      ]
    : [
        { label: 'À propos', to: routes.about },
        { label: 'Connexion', to: routes.login },
      ]

  async function handleLogout() {
    await signOut()
    navigate(routes.home)
  }

  const mobileAction = user
    ? { type: 'button', label: 'Déconnexion', onClick: handleLogout }
    : { type: 'link', label: 'Inscription', to: routes.register }

  return (
    <header className="relative z-50 border-b border-line bg-page">
      <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-16">
        <Logo />

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map(({ label, to }) => (
            <Link key={label} to={to} className={linkClassName}>
              {label}
            </Link>
          ))}

          {user ? (
            <>
              <span className="max-w-[12rem] truncate text-sm text-muted">{user.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-line bg-white px-4 py-2 font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:border-ink/25 active:translate-y-0 motion-reduce:transition-none cursor-pointer"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to={routes.register}
              className="rounded-lg bg-ink px-4 py-2 font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-85 active:translate-y-0 motion-reduce:transition-none"
            >
              Inscription
            </Link>
          )}
        </nav>

        <MobileMenu links={navLinks} action={mobileAction} />
      </div>
    </header>
  )
}

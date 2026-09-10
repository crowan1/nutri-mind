import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Logo from './Logo'

const MENU_ID = 'menu-mobile'

// Width at which the horizontal nav takes over. Must stay in sync with the
// md: prefix on the classes below.
const DESKTOP = '(min-width: 48rem)'

// The three bars, centred in the box: -mt-px offsets half their thickness.
// Each bar carries its own vertical offset and rotation, which is what lets
// the burger fold into a cross.
const BAR =
  'absolute left-1 top-1/2 -mt-px h-0.5 w-4 rounded-full bg-current transition-[translate,rotate,scale,opacity] duration-300 ease-out motion-reduce:transition-none'

function BurgerBars({ open }) {
  return (
    <span className="relative block size-6" aria-hidden="true">
      <span className={`${BAR} ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
      <span className={`${BAR} ${open ? 'scale-x-0 opacity-0' : ''}`} />
      <span className={`${BAR} ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
    </span>
  )
}

// Burger button and side drawer, for screens too narrow for the full nav.
export default function MobileMenu({ links, action }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [openedAt, setOpenedAt] = useState(pathname)
  const burgerRef = useRef(null)
  const panelRef = useRef(null)

  // Navigating closes the drawer, which would otherwise stay open over the
  // page you land on. Adjusted during render rather than in an effect, to skip
  // the frame where the menu is still open on the new page.
  if (pathname !== openedAt) {
    setOpenedAt(pathname)
    setOpen(false)
  }

  // Growing past the breakpoint closes it too: the drawer goes display:none
  // and must not leave a locked scroll or a lying aria-expanded behind.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP)

    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }

    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const burger = burgerRef.current

    // Focus goes to the drawer itself rather than its first link, so screen
    // readers announce the dialog and Tab then walks the links.
    //
    // Visibility is one of the transitioned properties, so it only flips to
    // visible once the transition has started, and .focus() on an element the
    // browser still considers invisible does nothing. Hence the two frames:
    // the first starts the transition, the second sees the change.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => panel.focus())
    })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      // The drawer covers the page, so focus must not leave it. The burger
      // sits above the drawer and doubles as its close button, so it belongs
      // in the cycle, first as it is in the DOM.
      const items = [burger, ...panel.querySelectorAll('a[href]')]
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    // The page must not scroll under the drawer.
    const scrollAvant = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = scrollAvant
      if (panel.contains(document.activeElement)) burger.focus()
    }
  }, [open])

  return (
    <>
      {/* z-50 keeps the burger above the drawer it closes, landing on the
          drawer's header row, level with its logo. */}
      <button
        ref={burgerRef}
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-controls={MENU_ID}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        className="relative z-50 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-lg text-ink transition hover:bg-ink/5 active:scale-90 md:hidden motion-reduce:transition-none"
      >
        <BurgerBars open={open} />
      </button>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-ink/40 transition-[opacity,visibility] duration-300 md:hidden motion-reduce:transition-none ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      {/* Kept in the DOM even when closed, so aria-controls always points at
          something and so closing can animate; `invisible` is what takes it
          out of the tab order in the meantime.

          Any link click closes it, including one to the current page, where
          the URL does not change and nothing else would. */}
      <div
        id={MENU_ID}
        ref={panelRef}
        role="dialog"
        aria-label="Menu"
        tabIndex={-1}
        onClick={(event) => {
          if (event.target.closest('a')) setOpen(false)
        }}
        className={`fixed inset-y-0 right-0 z-40 flex w-72 max-w-[85vw] flex-col border-l border-line bg-white shadow-2xl transition-[translate,visibility] duration-300 ease-out md:hidden motion-reduce:transition-none ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        {/* h-18 is the 72px of the page header, so the drawer's border and
            logo land at exactly the same height as the page's. */}
        <div className="flex h-18 items-center border-b border-line px-4">
          <Logo />
        </div>

        <nav className="flex-1 overflow-y-auto p-4 text-sm">
          <ul className="space-y-1">
            {links.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="block rounded-lg px-3 py-3 text-muted transition-colors hover:bg-page hover:text-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {action?.type === 'button' ? (
            <button
              type="button"
              onClick={action.onClick}
              className="mt-3 w-full rounded-lg border border-line bg-white px-3 py-3 text-center font-medium text-ink transition hover:bg-page"
            >
              {action.label}
            </button>
          ) : null}

          {action?.type === 'link' ? (
            <Link
              to={action.to}
              className="mt-3 block rounded-lg bg-ink px-3 py-3 text-center font-medium text-white transition-opacity hover:opacity-85"
            >
              {action.label}
            </Link>
          ) : null}
        </nav>
      </div>
    </>
  )
}

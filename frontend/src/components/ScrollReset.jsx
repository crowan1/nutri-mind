import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

import { routes } from '../routes'

const AUTH_PATHS = new Set([routes.login, routes.register, routes.forgotPassword])

export default function ScrollReset() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const fromPathname = previousPathname.current
    previousPathname.current = pathname

    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }

    if (navigationType === 'POP') return

    if (AUTH_PATHS.has(fromPathname) && AUTH_PATHS.has(pathname)) return

    window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])

  return null
}

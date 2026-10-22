import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { routes } from '../routes'

// While the session is being resolved these render nothing: the Preloader
// overlay already covers the viewport, and the real page then mounts behind it
// so the fade-out reveals a page that is ready rather than an empty frame.
export function GuestRoute() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to={routes.dashboard} replace />

  return <Outlet />
}

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to={routes.login} replace />

  return <Outlet />
}

import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { routes } from '../routes'

function AuthLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="size-8 animate-pulse rounded-full bg-brand/30" />
    </div>
  )
}

export function GuestRoute() {
  const { user, loading } = useAuth()

  if (loading) return <AuthLoading />
  if (user) return <Navigate to={routes.dashboard} replace />

  return <Outlet />
}

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return <AuthLoading />
  if (!user) return <Navigate to={routes.login} replace />

  return <Outlet />
}

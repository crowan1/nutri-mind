import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { fetchUser, logout as logoutRequest } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Counts the auth journeys currently in flight — signing in, signing up.
  // A counter rather than a flag so two overlapping calls cannot have the
  // first one to finish clear the second one's state.
  const [transitions, setTransitions] = useState(0)

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await fetchUser()
      setUser(currentUser)
      return currentUser
    } catch {
      setUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [refreshUser])

  const signIn = useCallback((authenticatedUser) => {
    setUser(authenticatedUser)
  }, [])

  // Marks an auth journey as under way for as long as `task` runs, which is
  // what the preloader covers. Pages hand it the whole trip — request, sign-in
  // and redirect — so the panel is still up when the destination mounts and
  // lifts on a screen that is ready.
  const runTransition = useCallback(async (task) => {
    setTransitions((count) => count + 1)

    try {
      return await task()
    } finally {
      setTransitions((count) => Math.max(0, count - 1))
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      await logoutRequest()
    } catch {
      // Swallowed on purpose. The server may be unreachable, or the session may
      // already be gone — either way the user asked to leave, and leaving them
      // signed in because the request failed is the one outcome that is
      // certainly wrong. Callers get a promise that always resolves.
    }

    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      // The initial session check and every auth journey look the same to the
      // preloader: the app is busy and has nothing to show yet.
      busy: loading || transitions > 0,
      signIn,
      signOut,
      refreshUser,
      runTransition,
    }),
    [user, loading, transitions, signIn, signOut, refreshUser, runTransition],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

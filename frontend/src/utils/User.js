export const userInitial = (user) => (user?.first_name || user?.email || '?').charAt(0).toUpperCase()

export const userDisplayName = (user) => {
  const full = [user?.first_name, user?.last_name].filter(Boolean).join(' ')
  return full || user?.email?.split('@')[0] || 'Utilisateur'
}

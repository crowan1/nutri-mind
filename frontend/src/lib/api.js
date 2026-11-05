function readCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

async function ensureCsrfCookie() {
  await fetch('/sanctum/csrf-cookie', { credentials: 'include' })
}

async function request(path, options = {}) {
  const csrfToken = readCookie('XSRF-TOKEN')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (csrfToken) {
    headers['X-XSRF-TOKEN'] = csrfToken
  }

  const response = await fetch(`/api${path}`, {
    credentials: 'include',
    headers,
    ...options,
  })

  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw { status: response.status, errors: data.errors ?? {}, message: data.message }
  }

  return data
}

// `request` throws { status, errors, message }: a bag of per-field message
// arrays plus the server's own line. A toast shows one line, so this picks the
// one worth showing — a field complaint first, being the more specific of the
// two.
//
// A throw with no status came from fetch itself: no response arrived at all,
// either because nothing was listening or because the connection dropped
// first. Its own message ("Failed to fetch") says nothing to a reader, and the
// two cases ask the same thing of them, so they share one line.
export function firstErrorMessage(error, fallback = 'Une erreur est survenue.') {
  if (!error?.status) {
    return "Le serveur n'a pas répondu. Réessayez dans un instant."
  }

  return Object.values(error.errors ?? {}).flat()[0] ?? error.message ?? fallback
}

export async function login(credentials) {
  await ensureCsrfCookie()
  return request('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function register(credentials) {
  await ensureCsrfCookie()
  return request('/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function logout() {
  await ensureCsrfCookie()
  return request('/logout', { method: 'POST' })
}

export async function fetchUser() {
  return request('/user')
}

export async function sendPasswordResetLink(email) {
  await ensureCsrfCookie()
  return request('/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export async function fetchProfile() {
  return request('/profile')
}

export async function updateProfile(changes) {
  await ensureCsrfCookie()
  return request('/profile', {
    method: 'PUT',
    body: JSON.stringify(changes),
  })
}

export async function fetchUserRecipes(userId) {
  return request(`/user/${userId}/recipes`)
}

export async function fetchTags() {
  return request('/tags')
}

export async function fetchRecipe(id) {
  return request(`/recipe/${id}`)
}

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

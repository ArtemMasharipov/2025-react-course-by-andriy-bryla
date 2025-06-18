const VALID_CREDENTIALS = [
  { login: 'admin', password: 'admin123' },
  { login: 'user', password: 'user123' },
  { login: 'test', password: 'test123' },
  { login: 'Іван', password: 'ivan123' },
]

export const validateCredentials = (login, password) => {
  if (!login?.trim() || !password?.trim()) {
    return false
  }

  return VALID_CREDENTIALS.some(
    credential => credential.login === login && credential.password === password
  )
}

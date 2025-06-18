import { AUTH_MESSAGES, USERS } from './constants.js'

export const authenticateUser = (login, password) => {
  const user = USERS.find(u => u.login === login && u.password === password)
  return {
    isAuthenticated: !!user,
    message: user ? AUTH_MESSAGES.SUCCESS : AUTH_MESSAGES.INVALID,
  }
}

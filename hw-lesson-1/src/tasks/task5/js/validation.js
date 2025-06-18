export const validateCredentials = (login, password) => {
  return login.trim() !== '' && password.trim() !== ''
}

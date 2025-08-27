export class HttpError extends Error {
  constructor(status, message, details = null) {
    super(message)
    this.status = status
    this.details = details
    this.name = 'HttpError'
  }
}

export function httpError(status, message, code) {
  const err = new Error(message)
  err.status = status
  if (code) err.code = code
  return err
}

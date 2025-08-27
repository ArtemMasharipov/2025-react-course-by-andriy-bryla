export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`)
  error.status = 404
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.status ||
    (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500)
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal server error',
      code: err.code || 'SERVER_ERROR',
    },
    meta:
      process.env.NODE_ENV === 'production' ? undefined : { stack: err.stack },
  })
}

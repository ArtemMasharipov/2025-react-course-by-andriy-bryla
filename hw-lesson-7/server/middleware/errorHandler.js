import { validationResult } from 'express-validator'

// Middleware для обробки помилок валідації
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Помилки валідації',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    })
  }

  next()
}

// Middleware для обробки помилок
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack)

  // Помилка валідації Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }))
    return res.status(400).json({
      success: false,
      message: 'Помилки валідації',
      errors,
    })
  }

  // Помилка дублювання
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    return res.status(400).json({
      success: false,
      message: `${field} вже існує`,
    })
  }

  // Помилка неправильного ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Невірний формат ID',
    })
  }

  // Загальна помилка сервера
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Внутрішня помилка сервера',
  })
}

// Middleware для обробки 404
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Маршрут не знайдено',
    path: req.originalUrl,
  })
}

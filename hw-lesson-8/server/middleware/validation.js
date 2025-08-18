import { validationResult } from 'express-validator'

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Помилки валідації',
      errors: errors.array(),
    })
  }
  next()
}

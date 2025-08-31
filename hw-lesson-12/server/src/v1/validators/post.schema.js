import { body, validationResult } from 'express-validator'

const postValidationRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Post title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Post title must be between 1 and 100 characters'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Post content is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Post content must be between 1 and 1000 characters'),

  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Author name must be between 1 and 50 characters'),
]

export const validatePost = [
  ...postValidationRules,
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array(),
      })
    }
    next()
  },
]

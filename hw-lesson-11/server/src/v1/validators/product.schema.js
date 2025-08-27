import { checkSchema } from 'express-validator'

export const createProductSchema = checkSchema({
  name: {
    trim: true,
    notEmpty: { errorMessage: 'Product name is required' },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'Product name must be between 1 and 100 characters',
    },
  },
  price: {
    notEmpty: { errorMessage: 'Price is required' },
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Price must be a number (>= 0)',
    },
    toFloat: true,
  },
})

export const getProductsSchema = checkSchema({
  q: {
    optional: true,
    isString: { errorMessage: 'Search query must be a string' },
    trim: true,
  },
  limit: {
    optional: true,
    isInt: {
      options: { min: 1, max: 100 },
      errorMessage: 'Limit must be between 1 and 100',
    },
    toInt: true,
  },
  skip: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: 'Skip must be a non-negative integer',
    },
    toInt: true,
  },
})

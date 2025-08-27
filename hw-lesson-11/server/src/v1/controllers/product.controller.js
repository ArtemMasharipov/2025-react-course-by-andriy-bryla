import { validationResult } from 'express-validator'
import { productService } from '../services/product.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HttpError } from '../utils/httpError.js'

export const productController = {
  // GET /api/v1/products
  getProducts: asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new HttpError(400, 'Validation failed', errors.array())
    }

    const { q, limit = 50, skip = 0 } = req.query

    const products = await productService.getProducts({ q, limit, skip })

    res.json(products)
  }),

  // POST /api/v1/products
  createProduct: asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new HttpError(400, 'Validation failed', errors.array())
    }

    const { name, price } = req.body

    const product = await productService.createProduct({ name, price })

    res.status(201).json(product)
  }),

  // GET /api/v1/products/:id
  getProductById: asyncHandler(async (req, res) => {
    const { id } = req.params

    const product = await productService.getProductById(id)

    if (!product) {
      throw new HttpError(404, 'Product not found')
    }

    res.json(product)
  }),

  // PUT /api/v1/products/:id
  updateProduct: asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, price } = req.body

    const product = await productService.updateProduct(id, { name, price })

    if (!product) {
      throw new HttpError(404, 'Product not found')
    }

    res.json(product)
  }),

  // DELETE /api/v1/products/:id
  deleteProduct: asyncHandler(async (req, res) => {
    const { id } = req.params

    const product = await productService.deleteProduct(id)

    if (!product) {
      throw new HttpError(404, 'Product not found')
    }

    res.status(204).send()
  }),
}

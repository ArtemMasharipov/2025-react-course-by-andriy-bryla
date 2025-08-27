import { Router } from 'express'
import { handleValidationErrors } from '../../../middleware/validation.js'
import { productController } from '../controllers/product.controller.js'
import {
  createProductSchema,
  getProductsSchema,
} from '../validators/product.schema.js'

const router = Router()

router.get(
  '/',
  getProductsSchema,
  handleValidationErrors,
  productController.getProducts
)

router.post(
  '/',
  createProductSchema,
  handleValidationErrors,
  productController.createProduct
)

router.get('/:id', productController.getProductById)

router.put(
  '/:id',
  createProductSchema,
  handleValidationErrors,
  productController.updateProduct
)

router.delete('/:id', productController.deleteProduct)

export default router

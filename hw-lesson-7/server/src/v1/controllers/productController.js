import productService from '../services/productService.js'

export const getProducts = async (req, res, next) => {
  try {
    const { categoryId, sort = '-createdAt' } = req.query

    const filters = { categoryId }
    const products = await productService.getAllProducts(filters, sort)

    res.json({
      success: true,
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await productService.getProductById(id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Товар не знайдено',
      })
    }

    res.json({
      success: true,
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

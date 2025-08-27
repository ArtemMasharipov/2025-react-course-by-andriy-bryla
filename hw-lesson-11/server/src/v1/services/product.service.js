import Product from '../models/Product.js'

export const productService = {
  async getProducts({ q = '', limit = 50, skip = 0 } = {}) {
    const query = {}
    // text search (if q provided)
    if (q && q.trim()) {
      query.$text = { $search: q.trim() }
    }

    const products = await Product.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 })

    return products
  },

  async createProduct(productData) {
    const product = new Product(productData)
    return await product.save()
  },
  async getProductById(id) {
    return await Product.findById(id)
  },
  async updateProduct(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    })
  },
  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id)
  },
  async getProductsCount(q = '') {
    const query = {}
    if (q && q.trim()) {
      query.$text = { $search: q.trim() }
    }
    return await Product.countDocuments(query)
  },
}

import Product from '../models/Product.js'

class ProductService {
  async getAllProducts(filters = {}, sort = '-createdAt') {
    const query = {}

    if (filters.categoryId) {
      query.categoryId = filters.categoryId
    }

    return await Product.find(query).sort(sort).lean()
  }

  async getProductById(id) {
    return await Product.findById(id).lean()
  }
}

export default new ProductService()

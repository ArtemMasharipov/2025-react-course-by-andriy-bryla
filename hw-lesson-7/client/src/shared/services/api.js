import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    if (axios.isCancel(error)) {
      return Promise.reject({ name: 'AbortError' })
    }
    return Promise.reject(error)
  }
)

class ApiService {
  constructor() {
    this.currentProductsRequest = null
  }

  async getProducts(filters = {}) {
    if (this.currentProductsRequest) {
      this.currentProductsRequest.cancel()
    }

    this.currentProductsRequest = this.getProductsWithCancel(filters)

    try {
      const result = await this.currentProductsRequest.promise
      this.currentProductsRequest = null
      return result
    } catch (error) {
      this.currentProductsRequest = null
      throw error
    }
  }

  async getProductById(id) {
    return apiClient.get(`/products/${id}`)
  }

  getProductsWithCancel(filters = {}) {
    const controller = new AbortController()

    const promise = apiClient.get('/products', {
      params: filters,
      signal: controller.signal,
    })

    return {
      promise,
      cancel: () => controller.abort(),
    }
  }
}

export default new ApiService()

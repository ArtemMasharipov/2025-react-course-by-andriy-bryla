import axios from 'axios'
import { API_ENDPOINTS } from '../../../shared/config/api'

const API_URL = import.meta.env.VITE_API_URL

// Create axios instance with default config
export const productHttp = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth or logging
productHttp.interceptors.request.use(
  config => {
    // Add auth token if needed
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor for error handling
productHttp.interceptors.response.use(
  response => response,
  error => {
    // Global error handling
    if (error.response?.status === 401) {
      // Handle unauthorized
    } else if (error.response?.status >= 500) {
      // Handle server errors
    }
    return Promise.reject(error)
  }
)

export const productApi = {
  // Optimized list with better error handling
  list: async () => {
    const { data } = await productHttp.get(API_ENDPOINTS.PRODUCTS)
    return data
  },

  create: async data => {
    const response = await productHttp.post(API_ENDPOINTS.PRODUCTS, data)
    return response.data
  },

  update: async (id, data) => {
    const response = await productHttp.put(
      `${API_ENDPOINTS.PRODUCTS}/${id}`,
      data
    )
    return response.data
  },

  remove: async id => {
    await productHttp.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`)
    return id
  },
}

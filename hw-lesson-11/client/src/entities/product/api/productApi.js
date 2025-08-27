import axios from 'axios'
import { API_ENDPOINTS } from '../../../shared/config/api'

const API_URL = import.meta.env.VITE_API_URL

export const productHttp = axios.create({ baseURL: API_URL })

export const productApi = {
  // Simple list fetch (single initial load); params & abort signal removed as unused
  list: () => productHttp.get(API_ENDPOINTS.PRODUCTS),
  create: data => productHttp.post(API_ENDPOINTS.PRODUCTS, data),
  update: (id, data) =>
    productHttp.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, data),
  remove: id => productHttp.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`),
}

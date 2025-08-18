import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  r => r,
  err => Promise.reject(err)
)

export default apiClient

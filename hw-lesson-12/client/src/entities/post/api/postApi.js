import { api } from '../../../shared/config/api'

export const postApi = {
  getPosts: async ({ page = 1, limit = 10 } = {}) => {
    const response = await api.get(`/api/v1/posts?page=${page}&limit=${limit}`)
    return response.data
  },

  getPost: async (id) => {
    const response = await api.get(`/api/v1/posts/${id}`)
    return response.data
  },

  createPost: async (postData) => {
    const response = await api.post('/api/v1/posts', postData)
    return response.data
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/api/v1/posts/${id}`, postData)
    return response.data
  },

  deletePost: async (id) => {
    const response = await api.delete(`/api/v1/posts/${id}`)
    return response.data
  }
}

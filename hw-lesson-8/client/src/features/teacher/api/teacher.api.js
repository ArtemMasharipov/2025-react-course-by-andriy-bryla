import apiClient from '@/shared/services/apiClient'

export const teacherAPI = {
  getAll: () => apiClient.get('/teachers').then(r => r.data.data),
  getById: id => apiClient.get(`/teachers/${id}`).then(r => r.data.data),
  create: data => apiClient.post('/teachers', data).then(r => r.data.data),
  update: (id, data) =>
    apiClient.put(`/teachers/${id}`, data).then(r => r.data.data),
  delete: id => apiClient.delete(`/teachers/${id}`).then(r => r.data.data),
}

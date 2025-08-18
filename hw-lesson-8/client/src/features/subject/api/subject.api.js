import apiClient from '@/shared/services/apiClient'

export const subjectAPI = {
  getAvailable: () => apiClient.get('/teachers/subjects').then(r => r.data),
}

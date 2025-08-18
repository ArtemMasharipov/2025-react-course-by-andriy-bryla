import apiClient from '@/shared/services/apiClient'

export const meetingAPI = {
  get: () => apiClient.get('/meetings').then(r => r.data.data),
  assign: id =>
    apiClient.patch(`/meetings/assign/${id}`).then(r => r.data.data),
  unassign: id =>
    apiClient.patch(`/meetings/unassign/${id}`).then(r => r.data.data),
}

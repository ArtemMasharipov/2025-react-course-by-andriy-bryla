import { createEntityApi } from '@/shared/api'

export const userApi = createEntityApi('user', 'users')

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddUserMutation,
} = userApi

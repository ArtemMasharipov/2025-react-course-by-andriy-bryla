import { useGetAllUsersQuery } from '@/entities/user'
import { selectAuthUser } from '@/features/auth/api/authSlice'
import { useSelector } from 'react-redux'
import { UserListItemWithActions } from '../UserListItemWithActions'

export function UserList() {
  const { data, isLoading, error } = useGetAllUsersQuery()
  const currentUser = useSelector(selectAuthUser)
  const currentRole = currentUser?.role

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Завантаження...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Помилка завантаження</h3>
        <p>{error.toString()}</p>
      </div>
    )
  }

  const users = data || []

  if (users.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Немає користувачів</h3>
        <p className="text-gray-500">Список користувачів порожній</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Користувачі</h2>
        <span className="text-sm text-gray-600">{users.length} користувачів</span>
      </div>
      
      <div className="space-y-3">
        {users.map((user) => (
          <UserListItemWithActions
            key={user.id}
            user={user}
            currentUser={currentUser}
            currentRole={currentRole}
          />
        ))}
      </div>
    </div>
  )
}

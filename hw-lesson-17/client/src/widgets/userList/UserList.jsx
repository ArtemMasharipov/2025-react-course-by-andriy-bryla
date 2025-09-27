import { selectAuthUser } from '@/features/auth'
import { UserCreateForm } from '@/features/user-management'
import { roles } from '@/shared/config/roles'
import { ErrorDisplay, Pagination } from '@/shared/ui'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUsersQuery } from '../../entities/user/api/userApi'
import { UserListItem } from '../../entities/user/ui/UserListItem'

export function UserList() {
  const [page, setPage] = useState(1)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const currentUser = useSelector(selectAuthUser)
  const limit = 10
  const { data, isLoading, error, refetch } = useGetUsersQuery()

  if (isLoading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Завантаження...</p>
      </div>
    </div>
  )
  
  if (error) return <ErrorDisplay error={error} message="Помилка завантаження користувачів" />

  const users = data?.items || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="space-y-8">
      {currentUser?.role === roles.admin && (
        <div className="flex justify-between items-center pt-4">
          <h1 className="text-2xl font-bold text-gray-900">Користувачі</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Додати користувача
          </button>
        </div>
      )}

      <div className="space-y-4">
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">Користувачі не знайдені</div>
        </div>
      )}

      <Pagination 
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {showCreateForm && (
        <UserCreateForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            refetch()
            setShowCreateForm(false)
          }}
        />
      )}
    </div>
  )
}

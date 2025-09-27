import { DeleteUserButton } from '@/features/user-management'

const getRoleBadgeClasses = (role) => {
  const roleStyles = {
    admin: 'bg-red-100 text-red-800',
    manager: 'bg-yellow-100 text-yellow-800',
    client: 'bg-green-100 text-green-800'
  }
  return roleStyles[role] || 'bg-gray-100 text-gray-800'
}

export function UserListItem({ user }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClasses(user.role)}`}>
              {user.role}
            </span>
          </div>
        </div>
        <div className="ml-4">
          <DeleteUserButton user={user} />
        </div>
      </div>
    </div>
  )
}

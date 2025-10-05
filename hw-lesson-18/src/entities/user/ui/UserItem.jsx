export function UserItem({ user, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="text-lg font-semibold text-gray-900 truncate">
            {user.displayName || user.email}
          </div>
          <div className="text-sm text-gray-600 truncate">
            {user.email}
          </div>
        </div>

        {/* Role Badge */}
        <div className="flex-shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'admin' 
              ? 'bg-red-100 text-red-800' 
              : user.role === 'manager'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {user.role}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {children}
        </div>
      </div>
    </div>
  )
}

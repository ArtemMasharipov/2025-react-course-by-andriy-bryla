import { useLogout } from '@/features/auth'

import { selectAuthUser } from '@/features/auth/api/authSlice'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

export function UserInfo() {
  const user = useSelector(selectAuthUser)

  const navigate = useNavigate()

  const { logoutUser } = useLogout()

  if (!user) {
    return (
      <Link
        to={frontRoutes.pages.LoginPage.navigationPath}
        className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Увійти
      </Link>
    )
  }

  const onLogout = () => {
    logoutUser()
    navigate(frontRoutes.pages.LoginPage.navigationPath)
  }

  const getRoleColor = (role) => {
    const roleColors = {
      admin: 'bg-red-100 text-red-800 border-red-200',
      manager: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      client: 'bg-green-100 text-green-800 border-green-200'
    }
    return roleColors[role] || 'bg-gray-100 text-gray-800 border-gray-200'
  }
  
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-gray-900">{user.name}</div>
          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
            {user.role}
          </div>
        </div>
      </div>
      
      <button 
        onClick={onLogout} 
        className="group inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 text-sm font-medium rounded-lg text-gray-700 shadow-sm hover:bg-red-50 hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
      >
        <svg className="w-4 h-4 mr-2 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Вийти
      </button>
    </div>
  )
}

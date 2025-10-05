import userDefault from '@/assets/user-default.svg'
import { useLogout } from '@/features/auth/logout/model/useLogout'
import { GoogleAuthProvider } from 'firebase/auth'

import { selectAuthUser } from '@/features/auth/api/authSlice'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

export function UserInfo({ onMobileAction }) {
  const user = useSelector(selectAuthUser)
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { logout } = useLogout()

  if (!user) {
    return (
      <Link
        to={frontRoutes.pages.LoginPage.navigationPath}
        onClick={() => onMobileAction?.()}
        className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        {t('navigation.login')}
      </Link>
    )
  }
  
  const onLogout = () => {
    logout()
    navigate(frontRoutes.pages.LoginPage.navigationPath)
    onMobileAction?.()
  }

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  return (
    <div className="flex items-center space-x-4">
      <img
        src={user.photoURL || userDefault}
        alt="user avatar"
        className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-white shadow-sm"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">
          {user.email}
        </div>
        <div className="text-xs text-gray-500">
          {t(`roles.${user.role}`)}
        </div>
      </div>
      <button
        onClick={onLogout}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        {t('navigation.logout')}
      </button>
    </div>
  )
}

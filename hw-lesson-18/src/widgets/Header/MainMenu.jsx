import { selectAuthUser } from '@/features/auth/api/authSlice'
import { getPagesObjectList } from '@/shared/config/routes/frontRoutes'
import { CartCounter } from '@/shared/ui/CartCounter'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router'

export function MainMenu({ isMobile = false, onItemClick }) {
  const user = useSelector(selectAuthUser)
  const { t } = useTranslation()
  const location = useLocation()


  const allowedRoutes = getPagesObjectList().filter(({ meta }) => {
    if (!meta.isInMenu) return false
    if (!meta.requireAuth) return true
    if (!user) return false
    if (!meta.roles) return true
    return meta?.roles.includes(user?.role)
  })

  const getTranslationKey = (path) => {
    const pathToKey = {
      '': 'navigation.home',
      'products': 'navigation.products',
      'users': 'navigation.users',
      'cart': 'navigation.cart',
      'favorites': 'navigation.favorites',
      'login': 'navigation.login'
    }
    return pathToKey[path] || 'navigation.home'
  }

  const isActiveRoute = (path) => {
    if (path === '' && location.pathname === '/') return true
    if (path !== '' && location.pathname.startsWith(`/${path}`)) return true
    return false
  }

  const linkClasses = (path) => {
    const isActive = isActiveRoute(path)
    const baseClasses = isMobile 
      ? 'block px-4 py-4 rounded-xl text-lg font-medium transition-all border-l-4 mb-2'
      : 'px-3 py-2 rounded-md text-sm font-medium transition-colors'
    
    const activeClasses = isActive
      ? isMobile ? 'text-blue-600 bg-blue-50 border-blue-600 shadow-sm' : 'text-blue-600 bg-blue-50'
      : isMobile ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-transparent hover:border-gray-300' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    
    return `${baseClasses} ${activeClasses}`
  }

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick()
    }
  }

  return (
    <nav className={isMobile ? 'space-y-1' : 'flex items-center space-x-1'}>
      {allowedRoutes.map(({ path, meta }) => (
        <Link 
          key={path} 
          to={path} 
          className={linkClasses(path)}
          onClick={handleItemClick}
        >
          <span className="flex items-center gap-2">
            {t(getTranslationKey(path))}
            {path === 'cart' && <CartCounter />}
          </span>
        </Link>
      ))}
    </nav>
  )
}

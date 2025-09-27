import { selectAuthUser } from '@/features/auth/api/authSlice'
import { getPagesObjectList } from '@/shared/config/routes/frontRoutes'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router'

export function MainMenu() {
  const user = useSelector(selectAuthUser)
  const location = useLocation()

  // Фільтруємо маршрути, які потрібно показати в меню (ті, що мають title)
  // І враховуємо requireAuth і ролі

  const allowedRoutes = getPagesObjectList().filter(({ meta }) => {
    if (!meta.isInMenu) return false
    if (!meta.requireAuth) return true
    if (!user) return false
    if (!meta.roles) return true
    return meta?.roles.includes(user?.role)
  })

  const getLinkClasses = (isActive) => {
    const baseClasses = 'px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 relative'
    const activeClasses = 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
    const inactiveClasses = 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
    
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
  }

  return (
    <nav className="flex items-center space-x-6">
      {allowedRoutes.map(({ path, meta }) => {
        const isActive = location.pathname === path
        return (
          <Link 
            key={path} 
            to={path} 
            className={getLinkClasses(isActive)}
          >
            {meta.title}
          </Link>
        )
      })}
    </nav>
  )
}

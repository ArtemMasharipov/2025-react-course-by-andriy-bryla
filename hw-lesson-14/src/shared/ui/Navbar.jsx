import { navItems } from '@shared/config/navigation.config'
import { NavLink } from 'react-router-dom'

/**
 * Навигационная панель
 */
export function Navbar({ onMenu, className = '' }) {
  // Маппинг цветов для Tailwind CSS
  const colorClasses = {
    blue: {
      active: 'bg-lime-100 text-lime-700',
      hover: 'hover:text-lime-600'
    },
    green: {
      active: 'bg-lime-100 text-lime-700',
      hover: 'hover:text-lime-600'
    },
    purple: {
      active: 'bg-lime-100 text-lime-700',
      hover: 'hover:text-lime-600'
    }
  }

  return (
    <header className={`sticky top-0 z-40 border-b border-lime-200 bg-lime-50/80 backdrop-blur-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="font-bold text-xl text-gray-900">EMR Demo</div>
          </NavLink>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(({ to, icon, label, color }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive, isPending }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? colorClasses[color].active
                    : `text-gray-600 ${colorClasses[color].hover} hover:bg-gray-100`
                }`
              }
              end={false}
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 w-10 h-10 text-lg font-medium text-gray-700 transition-all duration-150 hover:bg-gray-100 hover:text-gray-900 md:hidden"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <span>☰</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar

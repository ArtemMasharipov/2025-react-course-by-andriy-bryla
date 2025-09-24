import { navItems } from '@shared/config/navigation.config'
import { NavLink } from 'react-router-dom'

/**
 * Мобильное меню
 */
export function MobileDrawer({ open, onClose }) {
  // Маппинг цветов для Tailwind CSS
  const colorClasses = {
    blue: {
      active: 'bg-lime-50 text-lime-700 border-l-2 border-lime-600'
    },
    green: {
      active: 'bg-lime-50 text-lime-700 border-l-2 border-lime-600'
    },
    purple: {
      active: 'bg-lime-50 text-lime-700 border-l-2 border-lime-600'
    }
  }

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside className={`absolute left-0 top-0 h-full w-full bg-lime-50/95 backdrop-blur-sm shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 w-10 h-10 text-lg font-medium text-gray-700 transition-all duration-150 hover:bg-gray-100 hover:text-gray-900"
              onClick={onClose}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map(({ to, icon, label, color }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
                    isActive
                      ? colorClasses[color].active
                      : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                end={false}
              >
                {icon} {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default MobileDrawer

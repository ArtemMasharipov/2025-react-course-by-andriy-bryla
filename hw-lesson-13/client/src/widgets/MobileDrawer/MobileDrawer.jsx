import { Link, useLocation } from 'react-router-dom'

export const MobileDrawer = ({
  isOpen,
  onClose,
  navItems,
  title = "Posts Manager"
}) => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  if (!isOpen) return null

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed inset-0 z-50 flex">
        <div className="relative flex flex-col w-full bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">{title}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-emerald-100 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Закрыть меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6 overflow-y-auto">
            <nav className="px-4 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center px-4 py-3.5 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-emerald-700 bg-emerald-50 border-l-4 border-emerald-600 shadow-sm'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/70 hover:translate-x-1'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full transition-colors ${
                      isActive(item.path)
                        ? 'bg-emerald-600'
                        : 'bg-gray-300 group-hover:bg-emerald-400'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive(item.path) && (
                    <div className="ml-auto">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Footer info */}
          </div>
        </div>
      </div>
    </div>
  )
}

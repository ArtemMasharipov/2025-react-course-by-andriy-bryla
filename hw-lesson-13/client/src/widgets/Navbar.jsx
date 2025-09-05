import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constants'
import { MobileDrawer, MobileMenuButton } from '@/widgets/MobileDrawer'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navItems = [
    { path: ROUTES.HOME, label: 'Home' },
    { path: ROUTES.POSTS, label: 'Posts' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={ROUTES.HOME} className="text-xl font-bold text-emerald-600">
           HW Lesson 13 - RTK Query
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* Mobile Drawer */}
        <MobileDrawer
          isOpen={isMenuOpen}
          onClose={closeMenu}
          navItems={navItems}
          title="HW Lesson 13 - RTK Query"
        />
      </div>
    </nav>
  )
}

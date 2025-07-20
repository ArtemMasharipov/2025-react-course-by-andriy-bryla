import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navItems, ROUTES } from './navigation.constants'

const MenuIcon = ({ isOpen, onClick }) => (
  <button
    type="button"
    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
    onClick={onClick}
    aria-expanded={isOpen}
    aria-label="Toggle menu"
  >
    <svg
      className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <svg
      className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
)

const Logo = () => (
  <NavLink
    to={ROUTES.HOME}
    className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
  >
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">⚡</span>
    </div>
    <span>ElectroShop</span>
  </NavLink>
)

const DesktopNav = () => (
  <div className="hidden md:flex md:items-center md:space-x-1">
    {navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
              ? 'bg-blue-50 text-blue-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`
        }
      >
        {item.label}
      </NavLink>
    ))}
  </div>
)

const MobileMenu = ({ isOpen, onItemClick }) => (
  <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onItemClick}
          className={({ isActive }) =>
            `block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  </div>
)

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <DesktopNav />

          <div className="md:hidden">
            <MenuIcon isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onItemClick={closeMobileMenu} />
    </nav>
  )
}

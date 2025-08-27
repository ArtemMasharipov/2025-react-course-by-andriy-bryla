import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, ROUTE_NAMES } from '../router/routes.constants'
import Drawer from './Drawer'

const Navbar = () => {
  const location = useLocation()

  const [open, setOpen] = useState(false)

  const linkBase = 'px-3 py-2 rounded-md text-emerald-800 hover:text-emerald-900 hover:bg-emerald-100 transition dark:text-emerald-100 dark:hover:bg-emerald-800/40'
  const active = 'bg-emerald-200/70 text-emerald-900 dark:bg-emerald-700/60 dark:text-emerald-50'

  const NavLinks = ({ onClick, isMobile = false }) => (
    <ul className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row items-center gap-2'} text-sm font-medium`}>
      <li>
        <Link
          to={ROUTES.HOME}
          onClick={onClick}
          className={`${isMobile ? 'block py-3 px-4 text-base font-medium text-emerald-800 hover:bg-emerald-50 rounded-lg dark:text-emerald-100 dark:hover:bg-emerald-800/50' : linkBase} ${location.pathname === ROUTES.HOME ? active : ''}`}
        >
          {ROUTE_NAMES.HOME}
        </Link>
      </li>
      {isMobile && <hr className="border-emerald-200 dark:border-emerald-700" />}
      <li>
        <Link
          to={ROUTES.PRODUCTS}
          onClick={onClick}
          className={`${isMobile ? 'block py-3 px-4 text-base font-medium text-emerald-800 hover:bg-emerald-50 rounded-lg dark:text-emerald-100 dark:hover:bg-emerald-800/50' : linkBase} ${location.pathname.startsWith('/products') ? active : ''}`}
        >
          {ROUTE_NAMES.PRODUCTS}
        </Link>
      </li>
      {isMobile && <hr className="border-emerald-200 dark:border-emerald-700" />}
      <li>
        <Link
          to={ROUTES.POSTS}
          onClick={onClick}
          className={`${isMobile ? 'block py-3 px-4 text-base font-medium text-emerald-800 hover:bg-emerald-50 rounded-lg dark:text-emerald-100 dark:hover:bg-emerald-800/50' : linkBase} ${location.pathname === ROUTES.POSTS ? active : ''}`}
        >
          {ROUTE_NAMES.POSTS}
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className="sticky top-0 z-10 border-b border-emerald-400 bg-emerald-100/95 backdrop-blur supports-[backdrop-filter]:bg-emerald-100/90 dark:border-emerald-600 dark:bg-emerald-900/90">
      <div className="app-container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-md border border-emerald-300 bg-white text-emerald-700 shadow-sm transition hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-emerald-500 sm:hidden dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-200 dark:hover:bg-emerald-800"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span className="block h-0.5 w-5 bg-current transition-transform" />
            <span className="block h-0.5 w-5 bg-current transition-transform" />
            <span className="block h-0.5 w-5 bg-current transition-transform" />
          </button>
          <Link to={ROUTES.HOME} className="flex-1 text-lg font-semibold tracking-tight text-emerald-800 dark:text-emerald-100 sm:flex-none">
            HW Lesson 11
          </Link>
        </div>
        <div className="hidden sm:block">
          <NavLinks />
        </div>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} title="Navigation">
        <NavLinks onClick={() => setOpen(false)} isMobile />
      </Drawer>
    </nav>
  )
}

export default Navbar

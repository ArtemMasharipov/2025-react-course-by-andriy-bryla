import { ROUTES } from '@/routes/routes.constants'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { to: ROUTES.HOME, label: 'Головна', end: true },
    { to: ROUTES.TEACHERS, label: 'Вчителі' },
    { to: ROUTES.MEETINGS, label: 'Збори' },
    { to: ROUTES.ABOUT, label: 'Про додаток' },
    { to: ROUTES.DEVELOPER, label: 'Про розробника' },
  ]
  const baseLink = 'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500'
  const inactive = 'text-slate-700 hover:text-green-700 hover:bg-green-50'
  const active = 'text-green-700 bg-green-100'

  const NavItem = ({ to, end = false, children }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </NavLink>
  )

  // Scroll lock + ESC
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  return (
    <>
      <nav className="hidden md:flex gap-1">
        {navItems.map(i => (
          <NavItem key={i.to} to={i.to} end={i.end}>{i.label}</NavItem>
        ))}
      </nav>
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        onClick={() => setIsOpen(o => !o)}
      >
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bottom-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-nav"
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-full z-50 bg-white/95 backdrop-blur-md border-t border-green-100 shadow-xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-5">
          <div className="max-w-sm mx-auto w-full">
            <ul className="space-y-1">
              {navItems.map(i => (
                <li key={i.to}><NavItem to={i.to} end={i.end}>{i.label}</NavItem></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-4 pb-4 pt-3 border-t border-green-100 text-[11px] text-slate-400">© 2025</div>
      </aside>
    </>
  )
}

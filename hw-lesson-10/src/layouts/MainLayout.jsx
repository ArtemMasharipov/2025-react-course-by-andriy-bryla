import Breadcrumbs from '@components/navigation/Breadcrumbs.jsx';
import Drawer from '@components/ui/Drawer.jsx';
import { SelectionContext } from '@contexts/SelectionContext.js';
import { ThemeContext } from '@contexts/ThemeContext.js';
import { FRONT_ROUTES } from '@router/frontRoutes.js';
import { useContext, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { selectedBuses, selectedHotels } = useContext(SelectionContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={theme === 'dark' ? 'dark bg-neutral-900 text-neutral-100 min-h-screen flex flex-col' : 'bg-white text-neutral-900 min-h-screen flex flex-col'}>
      <header className="border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-neutral-900/70">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4 text-sm font-medium">
          <button
            className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <span aria-hidden="true">≡</span>
          </button>
          <nav className="hidden sm:flex items-center gap-3 flex-1">
            <NavLink to={FRONT_ROUTES.HOME} end className={({isActive}) => navClass(isActive)}>Home</NavLink>
            <NavLink to={FRONT_ROUTES.BUSES} className={({isActive}) => navClass(isActive)}>Buses ({selectedBuses.length})</NavLink>
            <NavLink to={FRONT_ROUTES.HOTELS} className={({isActive}) => navClass(isActive)}>Hotels ({selectedHotels.length})</NavLink>
            <NavLink to={FRONT_ROUTES.SUMMARY} className={({isActive}) => navClass(isActive)}>Summary</NavLink>
          </nav>
          <div className="ms-auto flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-600 px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Navigation menu" theme={theme}>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Mobile navigation">
            <NavLink onClick={() => setDrawerOpen(false)} to={FRONT_ROUTES.HOME} end className={({isActive}) => drawerNavClass(isActive, theme)}>Home</NavLink>
            <NavLink onClick={() => setDrawerOpen(false)} to={FRONT_ROUTES.BUSES} className={({isActive}) => drawerNavClass(isActive, theme)}>Buses ({selectedBuses.length})</NavLink>
            <NavLink onClick={() => setDrawerOpen(false)} to={FRONT_ROUTES.HOTELS} className={({isActive}) => drawerNavClass(isActive, theme)}>Hotels ({selectedHotels.length})</NavLink>
            <NavLink onClick={() => setDrawerOpen(false)} to={FRONT_ROUTES.SUMMARY} className={({isActive}) => drawerNavClass(isActive, theme)}>Summary</NavLink>
            <hr className={`my-2 ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`} />
            <button
              onClick={() => { toggleTheme(); /* keep drawer open to show instant result */ }}
              className={`inline-flex items-center rounded-md border px-3 py-1.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                theme === 'dark'
                  ? 'border-neutral-600 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:text-neutral-50'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              {theme === 'light' ? '☀️ Light theme' : '🌙 Dark theme'}
            </button>
          </nav>
        </Drawer>
      </header>
  <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <Breadcrumbs />
        <Outlet />
      </main>
      <footer className="text-center text-xs py-6 opacity-70">Demo travel planner · Theme: {theme}</footer>
    </div>
  );
}

function navClass(isActive){
  return (
    'px-3 py-1.5 rounded-md transition-colors text-neutral-800 dark:text-neutral-200 ' +
    (isActive ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm' : 'hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60')
  );
}

function drawerNavClass(isActive, theme){
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-neutral-200' : 'text-neutral-800';
  const hoverColor = isDark ? 'hover:bg-neutral-700/60' : 'hover:bg-neutral-200/70';
  const activeColor = isActive
    ? (isDark ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white')
    : '';

  return `px-3 py-1.5 rounded-md transition-colors ${textColor} ${activeColor} ${!isActive ? hoverColor : ''} ${isActive ? 'shadow-sm' : ''}`;
}

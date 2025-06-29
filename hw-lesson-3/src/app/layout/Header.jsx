import { useState } from 'react'
import { TaskSwitcher } from './TaskSwitcher'

export const Header = ({ tasks, activeTask, onTaskChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between py-3">
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            HW Lesson 3: React Хуки (useRef, useEffect)
          </h1>

          {tasks && (
            <nav className="ml-8">
              <TaskSwitcher
                tasks={tasks}
                activeTask={activeTask}
                onTaskChange={onTaskChange}
                isMobile={false}
              />
            </nav>
          )}
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-base font-semibold text-gray-900 tracking-tight truncate pr-3">
              HW Lesson 3: React Хуки
            </h1>

            <button
              onClick={toggleMenu}
              className="p-1.5 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Навігаційне меню"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && tasks && (
            <div className="pb-3 border-t border-gray-200">
              <div className="pt-3">
                <TaskSwitcher
                  tasks={tasks}
                  activeTask={activeTask}
                  onTaskChange={(taskId) => {
                    onTaskChange(taskId)
                    setIsMenuOpen(false)
                  }}
                  isMobile={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

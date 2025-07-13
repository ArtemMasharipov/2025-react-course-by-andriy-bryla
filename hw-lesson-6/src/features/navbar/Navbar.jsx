import { useEffect, useState } from 'react'

import { TASKS } from './constants'

function Navbar({ activeTask, onTaskChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const handleTaskChange = (taskId) => {
    onTaskChange(taskId)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Логотип */}
            <h1 className="text-xl font-bold text-gray-900">
              HW Lesson 6. Hooks. Practice.
            </h1>

            <div className="hidden md:flex space-x-1">
              {TASKS.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleTaskChange(task.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeTask === task.id
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                  }`}
                >
                  {task.name}
                </button>
              ))}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-0.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'mt-1'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'mt-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {TASKS.map((task) => (
            <button
              key={task.id}
              onClick={() => handleTaskChange(task.id)}
              className={`w-full text-left px-6 py-4 rounded-xl font-medium text-lg transition-colors duration-200 ${
                activeTask === task.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {task.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar

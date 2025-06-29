import { useState } from 'react'

import { HOMEWORK_TITLE, TASKS } from '../constants'

export default function Header({ activeTaskId, onTaskChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleTaskChange = (taskId) => {
    onTaskChange(taskId)
    setIsMobileMenuOpen(false)
  }

  const handleTaskClick = (taskId) => () => onTaskChange(taskId)

  return (
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">

        <div className="hidden md:flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {HOMEWORK_TITLE}
            </h1>
          </div>

          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {TASKS.map(task => (
              <button
                key={task.id}
                onClick={handleTaskClick(task.id)}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTaskId === task.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {task.shortTitle}
              </button>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">
                {HOMEWORK_TITLE}
              </h1>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="ml-3 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Відкрити меню"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-32 opacity-100'
              : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-1 pb-3">
              {TASKS.map(task => (
                <button
                  key={task.id}
                  onClick={() => handleTaskChange(task.id)}
                  className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                    activeTaskId === task.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{task.shortTitle}</span>
                    {activeTaskId === task.id && (
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

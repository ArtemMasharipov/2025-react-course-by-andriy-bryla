import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const Drawer = ({ open, onClose, children, title = 'Menu' }) => {
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
    return () => document.documentElement.classList.remove('overflow-hidden')
  }, [open])

  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label="Close menu"
      />
      {/* Drawer panel */}
      <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl dark:bg-emerald-900/95 sm:right-0 sm:left-auto sm:w-80 sm:max-w-[85vw] sm:border-l sm:border-emerald-200 dark:sm:border-emerald-800">
        <div className="flex items-center justify-between border-b border-emerald-200 p-4 dark:border-emerald-800">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-800"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Drawer

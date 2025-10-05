import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

export const BurgerMenu = forwardRef(({ isOpen, onClick, className = '' }, ref) => {
  const { t } = useTranslation()

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`
        relative w-8 h-8 flex flex-col justify-center items-center
        p-1 rounded-md transition-all duration-300 ease-in-out
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={isOpen ? t('mobile.closeMenu') : t('mobile.openMenu')}
      aria-expanded={isOpen}
    >
      <span
        className={`
          block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out
          ${isOpen ? 'rotate-45 translate-y-1.5' : ''}
        `}
      />
      <span
        className={`
          block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out mt-1
          ${isOpen ? 'opacity-0' : ''}
        `}
      />
      <span
        className={`
          block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out mt-1
          ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}
        `}
      />
    </button>
  )
})

BurgerMenu.displayName = 'BurgerMenu'

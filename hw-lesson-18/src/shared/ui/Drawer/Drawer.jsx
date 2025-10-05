import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export const Drawer = ({ isOpen, onClose, children, className = '' }) => {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => e.key === 'Escape' && onClose()
    const handleClickOutside = (e) => overlayRef.current === e.target && onClose()

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className={`
        absolute right-0 w-full h-full bg-white shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        sm:w-80 ${className}
      `}>
        {children}
      </div>
    </div>,
    document.body
  )
}

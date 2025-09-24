import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

export function useConfirmModal() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    resolve: null
  })

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        title: options.title || 'Confirm',
        message: options.message || 'Are you sure?',
        resolve
      })
    })
  }, [])

  const handleConfirm = useCallback(() => {
    if (modalState.resolve) {
      modalState.resolve(true)
    }
    setModalState(prev => ({ ...prev, isOpen: false, resolve: null }))
  }, [modalState.resolve])

  const handleCancel = useCallback(() => {
    if (modalState.resolve) {
      modalState.resolve(false)
    }
    setModalState(prev => ({ ...prev, isOpen: false, resolve: null }))
  }, [modalState.resolve])

  const modal = modalState.isOpen ? createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" 
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="relative card-lime rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {modalState.title}
          </h3>
          
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {modalState.message}
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-red-600 border border-transparent rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null

  return [confirm, modal]
}

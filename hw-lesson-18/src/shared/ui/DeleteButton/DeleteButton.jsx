import { useDeleteModal } from '@/shared/hooks'
import { DeleteModal } from '@/shared/ui/DeleteModal'
import { useTranslation } from 'react-i18next'

export const DeleteButton = ({ 
  onDelete, 
  entityName, 
  className = '',
  children 
}) => {
  const { t } = useTranslation()
  const { isOpen, isLoading, openModal, closeModal, handleConfirm } = useDeleteModal()

  return (
    <>
      <button
        onClick={() => openModal(onDelete)}
        disabled={isLoading}
        className={`inline-flex items-center px-3 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 ${className}`}
      >
        {children || (
          <>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {t('common.delete')}
          </>
        )}
      </button>

      <DeleteModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        entityName={entityName}
        isLoading={isLoading}
      />
    </>
  )
}

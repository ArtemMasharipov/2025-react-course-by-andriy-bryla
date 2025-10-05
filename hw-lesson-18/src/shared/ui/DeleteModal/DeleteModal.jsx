import { useTranslation } from 'react-i18next'

export const DeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  entityName = '',
  isLoading = false 
}) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-[101]">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('common.delete')}
            </h3>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              {t('common.confirmDelete', { entity: entityName })}
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {t('common.delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

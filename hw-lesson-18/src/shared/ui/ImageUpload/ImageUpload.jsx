import { useFileToBase64 } from '@/shared/hooks'
import { useTranslation } from 'react-i18next'

export const ImageUpload = ({ value, onChange, className = '' }) => {
  const { t } = useTranslation()
  const { value: preview, handleFileSelect, handleRemove } = useFileToBase64(value, onChange)

  return (
    <div className={`space-y-2 ${className}`}>
      {preview && (
        <div className="relative">
          <img 
            src={preview} 
            alt={t('image.preview')} 
            className="w-full h-32 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
            title={t('image.remove')}
          >
            ×
          </button>
        </div>
      )}
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  )
}

import { useDeleteProductMutation } from '@/entities/product'
import { DeleteButton } from '@/shared/ui/DeleteButton'
import { useTranslation } from 'react-i18next'

export function ProductDeleteButton({ productId, onDeleted }) {
  const { t } = useTranslation()
  const [deleteProduct] = useDeleteProductMutation()
  
  const handleDelete = async () => {
    await deleteProduct(productId)
    onDeleted && onDeleted()
  }

  return (
    <DeleteButton
      onDelete={handleDelete}
      entityName={t('products.title').toLowerCase()}
      className="px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors duration-200 flex items-center justify-center"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </DeleteButton>
  )
}

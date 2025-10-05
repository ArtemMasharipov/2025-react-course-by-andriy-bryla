import { useAddToFavoritesMutation } from '@/entities/favoriteItem'
import { useTranslation } from 'react-i18next'

export function FavoriteAddButton({ product, userId }) {
  const { t } = useTranslation()
  const [addToFavorites, { isLoading }] = useAddToFavoritesMutation()

  const handleAdd = async () => {
    await addToFavorites({
      userId,
      productId: product.id,
      product,
    })
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isLoading}
      className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      title={t('products.addToFavorites')}
    >
      ♥
    </button>
  )
}

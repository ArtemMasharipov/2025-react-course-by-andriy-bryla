import { useRemoveFromFavoritesMutation } from '@/entities/favoriteItem'
import { useTranslation } from 'react-i18next'

export function FavoriteRemoveButton({ productId, userId }) {
  const { t } = useTranslation()
  const [removeFromFavorites, { isLoading }] = useRemoveFromFavoritesMutation()

  const handleRemove = async () => {
    await removeFromFavorites({
      userId,
      productId,
    })
  }

  return (
    <button
      onClick={handleRemove}
      disabled={isLoading}
      className="w-10 h-10 rounded bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors duration-200 disabled:opacity-50"
      title={t('products.removeFromFavorites')}
    >
      <span className="text-base">♥</span>
    </button>
  )
}

import { useAddToFavoritesMutation, useIsFavoriteQuery, useRemoveFromFavoritesMutation } from '@/entities/favoriteItem'
import { useTranslation } from 'react-i18next'

export function FavoriteToggleButton({ product, userId }) {
  const { t } = useTranslation()
  const { data: isFavorite = false, isLoading: isChecking } = useIsFavoriteQuery({
    userId,
    productId: product.id,
  })
  
  const [addToFavorites, { isLoading: isAdding }] = useAddToFavoritesMutation()
  const [removeFromFavorites, { isLoading: isRemoving }] = useRemoveFromFavoritesMutation()

  const isLoading = isAdding || isRemoving || isChecking

  const handleToggle = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites({
          userId,
          productId: product.id,
        })
      } else {
        await addToFavorites({
          userId,
          productId: product.id,
          product,
        })
      }
    } catch (error) {
      // Error toggling favorite
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        w-10 h-10 rounded flex items-center justify-center transition-colors duration-200 
        disabled:opacity-50
        ${isFavorite 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
        }
      `}
      title={isFavorite ? t('products.removeFromFavorites') : t('products.addToFavorites')}
    >
      <span className="text-base">{isFavorite ? '♥' : '♡'}</span>
    </button>
  )
}

import { FavoriteItemCard, useGetUserFavoritesQuery } from '@/entities/favoriteItem'
import { FavoriteRemoveButton } from '@/features/favorites'
import { useTranslation } from 'react-i18next'

export default function FavoritesList({ userId }) {
  const { t } = useTranslation()
  const { data: favorites = {}, isLoading } = useGetUserFavoritesQuery(userId)
  const items = Object.entries(favorites).filter(([_, item]) => item)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">{t('common.loading')}</span>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('favorites.empty')}</h3>
        <p className="text-gray-500">{t('favorites.addToFavoritesMessage')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(([productId, item]) => (
          <FavoriteItemCard key={productId} item={item}>
            <FavoriteRemoveButton productId={productId} userId={userId} />
          </FavoriteItemCard>
        ))}
      </div>
    </div>
  )
}

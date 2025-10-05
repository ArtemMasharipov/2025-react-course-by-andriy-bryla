import { useGetUserCartQuery } from '@/entities/cartItem'
import { useTranslation } from 'react-i18next'
import { CartItemCardWithActions } from '../CartItemCardWithActions'

export default function CartList({ userId }) {
  const { t } = useTranslation()
  const { data: cart = {}, isLoading } = useGetUserCartQuery(userId)
  const items = Object.entries(cart).filter(([_, item]) => item)
  const total = items.reduce(
    (sum, [_, item]) => sum + (item.price || 0) * (item.quantity || 1),
    0
  )

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
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('cart.empty')}</h3>
        <p className="text-gray-500">{t('cart.addToCartMessage')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {items.map(([productId, item]) => (
        <CartItemCardWithActions
          key={productId}
          item={item}
          userId={userId}
          productId={productId}
        />
      ))}
      
      {items.length > 0 && (
        <div className="bg-blue-50 p-6 rounded-lg text-right">
          <span className="text-2xl font-bold text-gray-900">
            {t('cart.totalAmount', { amount: total })}
          </span>
        </div>
      )}
    </div>
  )
}

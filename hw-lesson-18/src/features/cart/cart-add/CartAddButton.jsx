import { useUpdateCartItemMutation } from '@/entities/cartItem'
import { useTranslation } from 'react-i18next'

export function CartAddButton({ product, userId }) {
  const { t } = useTranslation()
  const [updateCart, { isLoading }] = useUpdateCartItemMutation()
  
  const handleAdd = async () => {
    try {
      await updateCart({ userId, productId: product.id, product, action: 'add' })
    } catch (error) {
      // Error adding to cart
    }
  }
  
  return (
    <button
      onClick={handleAdd}
      disabled={isLoading}
      className="px-3 py-2 rounded bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1 disabled:opacity-50"
      title={t('products.addToCart')}
    >
      <span className="text-xs">🛒</span>
      {isLoading ? <span>{t('cart.adding')}</span> : <span>{t('common.add')}</span>}
    </button>
  )
}

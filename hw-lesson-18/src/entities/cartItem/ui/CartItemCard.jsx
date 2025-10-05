import { useTranslation } from 'react-i18next'

export function CartItemCard({ item, children }) {
  const { t } = useTranslation()
  const quantity = item.quantity || 1
  const total = (item.price || 0) * quantity
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between gap-4">
        {/* Product Image */}
        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="text-lg font-semibold text-gray-900 truncate">{item.name}</div>
          <div className="text-gray-600">{t('products.price')}: {item.price} {t('common.currency')}</div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          {children}
        </div>

        {/* Total Price */}
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">{total} {t('common.currency')}</div>
        </div>
      </div>
    </div>
  )
}

import { useTranslation } from 'react-i18next'

export function FavoriteItemCard({ item, children }) {
  const { t } = useTranslation()
  return (
    <div className="group bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {item.name}
        </h3>
        
        <div className="text-lg font-bold text-blue-600 mb-3">
          {item.price} {t('common.currency')}
        </div>

        <div className="mt-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

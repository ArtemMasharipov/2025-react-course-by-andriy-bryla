import { useGetAllProductsQuery } from '@/entities/product'
import { useTranslation } from 'react-i18next'
import { ProductCardWithActions } from '../ProductCardWithActions'

export default function ProductsList({ user }) {
  const { t } = useTranslation()
  const { data: products = [], isLoading } = useGetAllProductsQuery()

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">{t('common.loading')}</span>
      </div>
    )

  if (products.length === 0)
    return (
      <div className="text-center text-gray-500 py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('products.noProducts')}</h3>
        <p className="text-gray-500">{t('products.emptyList')}</p>
      </div>
    )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCardWithActions
          key={p.id}
          product={p}
          user={user}
        />
      ))}
    </div>
  )
}

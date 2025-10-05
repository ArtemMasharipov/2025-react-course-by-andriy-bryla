import { ProductAddButton } from '@/features/products'
import ProductsList from '@/widgets/ProductsList/ProductsList'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export default function ProductsPage() {
  const { t } = useTranslation()
  const user = useSelector((state) => state.auth.user)
  const role = user?.role

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('products.catalog')}
          </h1>
          <p className="text-gray-600">
            {t('products.catalogDescription')}
          </p>
        </div>

        {/* Admin Actions */}
        {(role === 'admin' || role === 'manager') && (
          <div className="mb-8">
            <ProductAddButton />
          </div>
        )}

        {/* Products Grid */}
        <ProductsList user={user} />
      </div>
    </div>
  )
}

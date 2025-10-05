import { useGetProductByIdQuery } from '@/entities/product/api/productApi'
import { ProductAddForm, ProductEditForm } from '@/features/products'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

export default function ProductEditPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading } = useGetProductByIdQuery(id, { skip: !id })

  const handleSuccess = () => {
    navigate(frontRoutes.pages.ProductsPage.navigationPath)
  }

  if (isLoading && id) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">{t('common.loading')}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {id ? t('products.edit') : t('products.add')}
          </h1>
          <p className="text-gray-600">
            {id ? t('products.editDescription') : t('products.addDescription')}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {id ? (
            <ProductEditForm product={product} onSuccess={handleSuccess} />
          ) : (
            <ProductAddForm onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  )
}

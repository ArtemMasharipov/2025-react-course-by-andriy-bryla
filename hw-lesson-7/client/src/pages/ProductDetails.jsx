import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buildRoute } from '../app/routes.constants'
import noImagePlaceholder from '../assets/no_image.jpg'
import { getCategoryName } from '../features/categories'
import { PageContainer } from '../layout'
import { Breadcrumbs } from '../shared/components/ui'
import Spinner from '../shared/components/ui/Spinner'
import apiService from '../shared/services/api'

export default function ProductDetails() {
  const { categoryId, productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setImageError(false)

      const response = await apiService.getProductById(productId)
      if (response?.data) {
        setProduct(response.data)
      } else {
        setError('Товар не найден')
      }
    } catch {
      setError('Помилка завантаження товару')
    } finally {
      setLoading(false)
    }
  }, [productId])

  useEffect(() => {
    loadProduct()
  }, [loadProduct])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-4"
        >
          Спробувати знову
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Назад
        </button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Товар не знайдений</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Назад
        </button>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Головна', onClick: () => navigate('/') },
    { label: 'Магазин', onClick: () => navigate('/shop') },
    { label: getCategoryName(categoryId), onClick: () => navigate(buildRoute.shopCategory(categoryId)) },
    { label: product.name }
  ]

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={imageError || !product.images?.[0] ? noImagePlaceholder : product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                onError={handleImageError}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {getCategoryName(product.categoryId)}
                </span>

                <span className={`px-3 py-1 rounded-full text-sm ${
                  product.inStock
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? '✓ В наявності' : '✗ Немає в наявності'}
                </span>
              </div>
            </div>

            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Опис</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-green-600">
                  {product.price.toLocaleString('uk-UA')} ₴
                </span>

                {product.quantity > 0 && (
                  <span className="text-gray-500">
                    Доступно: {product.quantity} шт.
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Додати в кошик' : 'Немає в наявності'}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Назад
                </button>
              </div>
            </div>

            <div className="border-t pt-6 text-sm text-gray-500">
              <p>Код товару: {product._id}</p>
              {product.createdAt && (
                <p>Додано: {new Date(product.createdAt).toLocaleDateString('uk-UA')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

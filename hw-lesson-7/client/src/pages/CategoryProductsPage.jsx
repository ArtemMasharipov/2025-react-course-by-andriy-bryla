import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryName } from '../features/categories'
import { ProductsSection } from '../features/products'
import { Breadcrumbs } from '../shared/components/ui'

export default function CategoryProductsPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const breadcrumbItems = [
    { label: 'Головна', onClick: () => navigate('/') },
    { label: 'Магазин', onClick: () => navigate('/shop') },
    { label: getCategoryName(categoryId) }
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getCategoryName(categoryId)}
        </h1>
      </div>

      <ProductsSection selectedCategoryId={categoryId} />
    </div>
  )
}

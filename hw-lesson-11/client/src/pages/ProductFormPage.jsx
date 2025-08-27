import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../entities/product/ui/ProductForm'
import { ROUTES } from '../router/routes.constants'
import Breadcrumb from '../widgets/Breadcrumb'

const ProductFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const isEditMode = !!id

  const handleClose = () => {
    navigate(ROUTES.PRODUCTS)
  }

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col">
      <div className="mb-6">
        <Breadcrumb />
      </div>
      <div className="flex flex-1 items-center justify-center py-6">
        <div className="w-full max-w-xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-olive-800 dark:text-olive-200">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
            <button onClick={handleClose} className="btn btn-secondary">← Back</button>
          </div>
          <ProductForm productId={id} onClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default ProductFormPage

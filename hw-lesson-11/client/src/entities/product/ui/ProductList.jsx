import { useDispatch, useSelector } from 'react-redux'
import { REQUEST_STATUS } from '../../../shared/config/api'
import { selectFilteredProducts, selectProductsError, selectProductsStatus } from '../model/selectors'
import { deleteProductThunk } from '../model/thunks'
import ProductCard from './ProductCard'

const ProductList = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  const handleDelete = productId => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProductThunk(productId))
    }
  }

  if (status === REQUEST_STATUS.LOADING) {
    return <div className="flex flex-col items-center gap-3 py-10"><div className="spinner" /><p className="text-sm text-slate-500">Loading products...</p></div>
  }
  if (status === REQUEST_STATUS.FAILED) {
    return <div className="flex flex-col items-center gap-3 py-10"><p className="text-sm text-red-600">Error loading products: {error}</p></div>
  }
  if (products.length === 0) {
    return <div className="flex flex-col items-center gap-3 py-10"><p className="text-sm text-slate-500">No products found.</p><small className="text-xs text-slate-400">Try adjusting your search or add a new product.</small></div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Products <span className="badge ml-1">{products.length}</span></h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <ProductCard key={p._id} product={p} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default ProductList

import { REQUEST_STATUS } from '../../../shared/config/api'
import { useProducts } from '../model/hooks'
import ProductCard from './ProductCard'

const ProductList = () => {
  const { products, status, error, deleteProduct } = useProducts()

  if (status === REQUEST_STATUS.LOADING) {
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <div className="spinner" />
        <p className="text-sm text-slate-500">Loading products...</p>
      </div>
    )
  }

  if (status === REQUEST_STATUS.FAILED) {
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <p className="text-sm text-red-600">Error loading products: {error}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <p className="text-sm text-slate-500">No products found.</p>
        <small className="text-xs text-slate-400">Try adjusting your search or add a new product.</small>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">
          Products <span className="badge ml-1">{products.length}</span>
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={deleteProduct}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProductsStatus } from '../entities/product/model/selectors'
import { fetchProductsThunk } from '../entities/product/model/thunks'
import ProductList from '../entities/product/ui/ProductList'
import { FilterInput } from '../features/product-filter/ui/FilterInput'
import { ROUTES } from '../router/routes.constants'
import { REQUEST_STATUS } from '../shared/config/api'
import Breadcrumb from '../widgets/Breadcrumb'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const status = useSelector(selectProductsStatus)

  useEffect(() => {
    if (status === REQUEST_STATUS.IDLE) {
  dispatch(fetchProductsThunk())
    }
  }, [dispatch, status])

  return (
    <div className="space-y-8">
      <Breadcrumb />
      <div className="page-header">
        <div>
          <h1 className="heading-hero">Products Management</h1>
          <p className="mt-2 max-w-prose text-sm text-slate-600">Manage your product inventory with search and filtering capabilities.</p>
        </div>
        <Link to={ROUTES.PRODUCT_ADD} className="btn self-start">+ Add New Product</Link>
      </div>
      <FilterInput />
      <ProductList />
    </div>
  )
}

export default ProductsPage

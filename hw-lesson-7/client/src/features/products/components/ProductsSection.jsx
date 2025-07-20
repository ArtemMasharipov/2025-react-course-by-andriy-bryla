import { useCallback, useEffect, useState } from 'react'
import Spinner from '../../../shared/components/ui/Spinner'
import apiService from '../../../shared/services/api'
import { getCategoryName } from '../../categories'
import ProductCard from './ProductCard'

const STATUS = {
  LOADING: 'loading',
  ERROR: 'error',
  EMPTY: 'empty',
  SUCCESS: 'success'
}

const LoadingState = () => (
  <section className="text-center py-16">
    <Spinner size="lg" />
    <p className="text-gray-500 mt-4">Завантаження товарів…</p>
  </section>
)

const ErrorState = ({ error, onRetry }) => (
  <section className="text-center py-16">
    <div className="text-red-500 text-6xl mb-4">⚠️</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Щось пішло не так</h3>
    <p className="text-gray-600 mb-6">{error}</p>
    <button
      onClick={onRetry}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Спробувати знову
    </button>
  </section>
)

const EmptyState = ({ selectedCategoryId }) => (
  <section className="text-center py-16">
    <div className="text-gray-400 text-6xl mb-4">📦</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Товари не знайдені</h3>
    <p className="text-gray-600 mb-6">
      {selectedCategoryId
        ? 'В цій категорії поки немає товарів. Спробуйте вибрати іншу категорію.'
        : 'Схоже, що товари поки не додані до каталогу.'}
    </p>
    {selectedCategoryId && (
      <button
        onClick={() => window.history.back()}
        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Повернутися до категорій
      </button>
    )}
  </section>
)

const ProductsGrid = ({ products, selectedCategoryId }) => (
  <section>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {selectedCategoryId
          ? `Товари категорії: ${getCategoryName(selectedCategoryId)}`
          : 'Всі товари'}
      </h2>
      <span className="text-gray-500">
        Знайдено: {products.length} {products.length === 1 ? 'товар' : 'товарів'}
      </span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </section>
)

export default function ProductsSection({ selectedCategoryId }) {
  const [state, setState] = useState({
    status: STATUS.LOADING,
    products: [],
    error: null
  })

  const loadProducts = useCallback(async () => {
    setState(prev => ({ ...prev, status: STATUS.LOADING, error: null }))

    try {
      const filters = selectedCategoryId ? { categoryId: selectedCategoryId } : {}
      const data = await apiService.getProducts(filters)

      const products = data?.data || []
      setState({
        status: products.length > 0 ? STATUS.SUCCESS : STATUS.EMPTY,
        products,
        error: null
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        setState({
          status: STATUS.ERROR,
          products: [],
          error: 'Помилка завантаження товарів'
        })
      }
    }
  }, [selectedCategoryId])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  switch (state.status) {
    case STATUS.LOADING:
      return <LoadingState />

    case STATUS.ERROR:
      return <ErrorState error={state.error} onRetry={loadProducts} />

    case STATUS.EMPTY:
      return <EmptyState selectedCategoryId={selectedCategoryId} />

    case STATUS.SUCCESS:
      return <ProductsGrid products={state.products} selectedCategoryId={selectedCategoryId} />

    default:
      return null
  }
}

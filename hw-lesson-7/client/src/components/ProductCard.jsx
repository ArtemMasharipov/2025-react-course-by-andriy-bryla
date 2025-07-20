import { memo } from 'react'
import { Link } from 'react-router-dom'
import { getCategoryName } from '../shared/constants/categories'

const ProductCard = memo(({ product }) => (
  <Link
    to={`/product/${product._id}`}
    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-200 block"
  >
    <div className="h-48 bg-gray-100 flex items-center justify-center">
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-gray-400 text-sm">Немає зображення</div>
      )}
    </div>

    <div className="p-4">
      <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
        {product.name}
      </h3>

      {product.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>
      )}

      <div className="flex justify-between items-center mb-3">
        <span className="text-2xl font-bold text-green-600">
          {product.price.toLocaleString('uk-UA')} ₴
        </span>

        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {getCategoryName(product.categoryId)}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className={`
          ${product.inStock ? 'text-green-600' : 'text-red-600'}
        `}>
          {product.inStock ? '✓ В наявності' : '✗ Немає в наявності'}
        </span>

        {product.quantity > 0 && (
          <span>
            Кількість: {product.quantity}
          </span>
        )}
      </div>
    </div>
  </Link>
))

ProductCard.displayName = 'ProductCard'

export default ProductCard

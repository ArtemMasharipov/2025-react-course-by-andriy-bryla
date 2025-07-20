import { Link } from 'react-router-dom'
import { buildRoute } from '../../../app/routes.constants'

const CategoryItem = ({ category }) => (
  <Link
    to={buildRoute.shopCategory(category.id)}
    className="p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer transition-all duration-200 transform hover:scale-105 block"
  >
    <h3 className="font-semibold text-lg text-gray-800 mb-2">
      {category.name}
    </h3>
    {category.description && (
      <p className="text-gray-600 text-sm line-clamp-2">
        {category.description}
      </p>
    )}
  </Link>
)

export default CategoryItem

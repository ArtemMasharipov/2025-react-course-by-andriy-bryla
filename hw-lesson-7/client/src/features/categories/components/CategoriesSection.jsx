import { CATEGORIES } from '../categories.constants'
import CategoryItem from './CategoryItem'

export default function CategoriesSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Категорії</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 animate-fade-in">
        {CATEGORIES.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </section>
  )
}

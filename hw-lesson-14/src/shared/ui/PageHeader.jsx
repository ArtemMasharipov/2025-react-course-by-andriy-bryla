import { Link } from 'react-router-dom'

/**
 * Заголовок страницы с кнопкой создания
 */
export function PageHeader({ title, createPath, createLabel, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 ${className}`}>
      <h1 className="text-2xl sm:text-3xl font-bold text-lime-900">{title}</h1>
      {createPath && createLabel && (
        <Link 
          to={createPath}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-lime-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 self-start sm:self-auto"
        >
          <span className="text-lg">+</span>
          {createLabel}
        </Link>
      )}
    </div>
  )
}

export default PageHeader

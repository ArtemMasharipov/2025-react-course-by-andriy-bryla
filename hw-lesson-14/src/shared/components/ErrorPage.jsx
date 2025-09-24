import { Link } from 'react-router-dom'

export default function ErrorPage({ error, backTo, entityName = 'item' }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600 mb-4">Failed to load {entityName} details</p>
        <p className="text-sm text-red-600 mb-6">{error?.message || error}</p>
        <Link
          to={backTo}
          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          ← Back to {entityName}s
        </Link>
      </div>
    </div>
  )
}

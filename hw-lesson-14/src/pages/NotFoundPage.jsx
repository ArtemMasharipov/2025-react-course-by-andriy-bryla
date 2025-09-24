import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">404</h1>
      <h2 className="text-xl mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page you are looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  )
}

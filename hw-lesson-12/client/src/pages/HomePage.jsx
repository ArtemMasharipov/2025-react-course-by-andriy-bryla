import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constants'

export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-6">
          Welcome to Posts Manager
        </h1>
        <p className="text-xl text-emerald-600 mb-8">
          A simple and efficient way to manage your posts with pagination and infinite scroll
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to={ROUTES.POSTS}
            className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-lg font-medium"
          >
            View Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

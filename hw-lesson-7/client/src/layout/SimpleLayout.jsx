import { Link, Outlet } from 'react-router-dom'
import AppFooter from '../shared/components/ui/AppFooter'

export default function SimpleLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 py-8">
        <Outlet />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="text-center">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              На головну
            </Link>
          </div>
        </div>
      </main>

              <AppFooter />
    </div>
  )
}

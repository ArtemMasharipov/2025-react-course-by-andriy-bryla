import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg p-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Сторінку не знайдено</h2>

          <div className="text-lg text-gray-700 leading-relaxed space-y-4 mb-6">
            <p>Програміст на фрілансі забув створити цю сторінку</p>
            <p>або просто не виспався 😴</p>
          </div>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Повернутися на головну
          </Link>
        </div>
      </div>
    </div>
  )
}

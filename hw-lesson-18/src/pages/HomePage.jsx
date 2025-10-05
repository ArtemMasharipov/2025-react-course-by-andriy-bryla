import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('pages.homeTitle')}{' '}
            <span className="text-blue-600">Firebase Shop</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('pages.homeSubtitle')}
          </p>
        </div>
      </div>
    </div>
  )
}

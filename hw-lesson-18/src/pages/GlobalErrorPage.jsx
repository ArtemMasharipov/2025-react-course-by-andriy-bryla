import { ActionButton } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { Link, useRouteError } from 'react-router'

export default function GlobalErrorPage() {
  const { t } = useTranslation()
  const error = useRouteError()

  const getErrorMessage = () => {
    if (error?.status === 404) {
      return t('pages.notFound')
    }
    if (error?.status === 403) {
      return t('pages.forbidden')
    }
    return error?.message || t('common.error')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {error?.status === 404 ? t('pages.notFound') : t('common.error')}
        </h1>
        <p className="text-gray-600 mb-6">
          {getErrorMessage()}
        </p>
        <div className="space-y-3">
          <Link to="/">
            <ActionButton variant="primary" size="md" className="w-full">
              {t('navigation.home')}
            </ActionButton>
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="w-full text-blue-600 hover:text-blue-800 font-medium"
          >
            {t('common.reload')}
          </button>
        </div>
      </div>
    </div>
  )
}

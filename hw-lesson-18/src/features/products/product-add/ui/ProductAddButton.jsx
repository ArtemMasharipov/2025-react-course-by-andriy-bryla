import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export function ProductAddButton() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const onClick = () => {
    navigate(frontRoutes.pages.ProductEditPage.navigationPath())
  }
  return (
    <button
      className="mb-4 px-6 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white"
      onClick={onClick}
    >
      {t('products.add')}
    </button>
  )
}

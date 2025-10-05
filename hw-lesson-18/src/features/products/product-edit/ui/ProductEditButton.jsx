import editIcon from '@/assets/icons/edit-white.svg'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export function ProductEditButton({ productId }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const onClick = () => {
    navigate(frontRoutes.pages.ProductEditPage.navigationPath(productId))
  }
  return (
    <button
      className="px-3 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium transition-colors duration-200 flex items-center justify-center"
      title={t('products.edit')}
      onClick={onClick}
    >
      <img src={editIcon} alt={t('products.edit')} className="w-4 h-4" />
    </button>
  )
}

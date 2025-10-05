import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CartList from '../widgets/CartList/CartList'

export default function CartPage() {
  const { t } = useTranslation()
  const user = useSelector((state) => state.auth.user)
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('auth.needAuth')}</h3>
          <p className="text-gray-500">{t('auth.loginToView')} {t('cart.title').toLowerCase()}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('cart.myCart')}
        </h1>
        <p className="text-gray-600 mb-8">
          {t('cart.cartDescription')}
        </p>
        <CartList userId={user.uid} />
      </div>
    </div>
  )
}

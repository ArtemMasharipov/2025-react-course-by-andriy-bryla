import { Drawer } from '@/shared/ui/Drawer'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { MainMenu } from '../Header/MainMenu'
import { UserInfo } from '../Header/UserInfo'

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { t } = useTranslation()

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 bg-white border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t('mobile.menu')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={t('mobile.closeMenu')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white">
          <MainMenu isMobile onItemClick={onClose} />
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{t('mobile.language')}</span>
              <LanguageSwitcher />
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <UserInfo onMobileAction={onClose} />
          </div>
        </div>
      </div>
    </Drawer>
  )
}

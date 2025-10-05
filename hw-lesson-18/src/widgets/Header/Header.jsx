import { BurgerMenu } from '@/shared/ui/BurgerMenu'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher'
import { MobileDrawer } from '@/widgets/MobileDrawer'
import { useEffect, useState } from 'react'
import { MainMenu } from './MainMenu'
import { UserInfo } from './UserInfo'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className={`
      sticky top-0 z-50 w-full transition-all duration-300
      ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'}
      border-b border-gray-200
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900">ShopApp</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <MainMenu />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="hidden md:block">
              <UserInfo />
            </div>
            <div className="md:hidden">
              <BurgerMenu isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
            </div>
          </div>
        </div>
      </div>
      
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  )
}

import { MainMenu } from './MainMenu'
import { UserInfo } from './UserInfo'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <MainMenu />
          <UserInfo />
        </div>
      </div>
    </header>
  )
}

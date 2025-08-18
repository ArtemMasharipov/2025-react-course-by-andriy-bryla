import AppHeader from '@/shared/ui/AppHeader'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-50">
  <AppHeader />

  <main className="flex-1 pt-24 md:pt-24 pb-4 sm:pb-6 lg:pb-8 px-4">
        <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
          <Outlet />
        </div>
      </main>
      <footer className="border-t bg-white/70 backdrop-blur px-4 py-3 sm:py-4 text-center text-xs text-slate-500">
        © 2025 Додаток "Вчителі". Всі права захищено.
      </footer>
    </div>
  )
}

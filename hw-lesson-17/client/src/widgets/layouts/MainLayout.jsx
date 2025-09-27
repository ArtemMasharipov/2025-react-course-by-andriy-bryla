import { Outlet } from 'react-router'
import { Header } from '../Header'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Outlet />
      </main>
    </div>
  )
}

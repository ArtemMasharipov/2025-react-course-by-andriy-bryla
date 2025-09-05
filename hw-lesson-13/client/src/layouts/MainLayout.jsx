import { Outlet } from 'react-router-dom'

import { Breadcrumbs } from '@/widgets/Breadcrumbs'
import { Navbar } from '@/widgets/Navbar'

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="border-b border-gray-200">
        <Breadcrumbs />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

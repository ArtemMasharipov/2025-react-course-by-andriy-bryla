import { Outlet } from 'react-router-dom'
import NavBar from '../features/navigation/NavBar'
import AppFooter from '../shared/components/ui/AppFooter'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}

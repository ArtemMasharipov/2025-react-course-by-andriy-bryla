import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Loader from '../shared/ui/Loader'
import Navbar from '../widgets/Navbar'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="app-container">
          <Suspense fallback={<Loader className="min-h-[200px]" /> }>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <footer className="mt-auto border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="app-container py-4 text-center">
          <p className="text-xs text-slate-500">&copy; 2025 Products App. Built with React & Redux Toolkit.</p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout

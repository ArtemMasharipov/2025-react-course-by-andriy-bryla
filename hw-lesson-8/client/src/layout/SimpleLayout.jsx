import AppButton from '@/shared/ui/AppButton'
import AppHeader from '@/shared/ui/AppHeader'
import { Outlet, useNavigate } from 'react-router-dom'
export default function PageLayout() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <AppHeader />
      <div className="pt-24 px-4 pb-10">
        <div className="mx-auto max-w-3xl bg-white/90 backdrop-blur rounded-xl shadow-sm ring-1 ring-green-100 p-6">
          <div className="flex justify-end mb-6">
            <AppButton variant="outline" onClick={() => navigate(-1)}>Назад</AppButton>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

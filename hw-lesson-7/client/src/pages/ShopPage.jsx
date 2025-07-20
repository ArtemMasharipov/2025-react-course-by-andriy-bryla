import { Outlet } from 'react-router-dom'
import { PageContainer } from '../layout'

export default function ShopPage() {
  return (
    <div className="bg-gray-50 py-8">
      <PageContainer maxWidth="7xl">
        <Outlet />
      </PageContainer>
    </div>
  )
}

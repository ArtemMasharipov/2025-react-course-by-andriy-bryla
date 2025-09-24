import { Breadcrumbs, MobileDrawer, Navbar } from '@shared/ui'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="min-h-dvh page-bg">
      <Navbar onMenu={() => setOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs />
        <Outlet />
      </main>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

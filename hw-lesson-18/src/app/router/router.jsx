import { Mutex } from 'async-mutex'
import { createBrowserRouter } from 'react-router'
import { appRouterRoutes } from './appRouterRoutes'
import { authCheckLoader } from './authCheckLoader'

import GlobalErrorPage from '@/pages/GlobalErrorPage'
import { MainLayout } from '@/widgets/layouts'

const refreshMutex = new Mutex()
const authLoader = authCheckLoader({
  refreshMutex,
})

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errElement: <GlobalErrorPage />,
    children: appRouterRoutes.map((route) => ({
      ...route,
      loader: () => authLoader(route),
    })),
  },
])

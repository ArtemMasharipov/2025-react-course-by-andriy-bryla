import { Mutex } from 'async-mutex'
import { createBrowserRouter } from 'react-router'
import { appRouterRoutes } from './appRouterRoutes'
import { authCheckLoader } from './authCheckLoader'

import GlobalErrorPage from '@/pages/GlobalErrorPage'
import { MainLayout } from '@/widgets/layouts'

// Глобальний м'ютекс для запобігання конкурентним запитам оновлення
const refreshMutex = new Mutex()
// Лоадер для перевірки автентифікації та ролей користувача
const authLoader = authCheckLoader({
  refreshMutex,
})


export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    // loader: ()=>authLoader,
    errorElement: <GlobalErrorPage />,
    children: appRouterRoutes.map((route) => ({
      ...route,
      loader: () => authLoader(route),
    })),
  },
])

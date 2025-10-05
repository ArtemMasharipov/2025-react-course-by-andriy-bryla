import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import '@/shared/config/i18n'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { router } from './app/router/router'
import { store } from './app/store/store'
import './index.css'

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
)

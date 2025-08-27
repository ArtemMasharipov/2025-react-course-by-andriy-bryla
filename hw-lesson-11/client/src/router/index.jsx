import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import { ROUTES } from './routes.constants'

// Lazy pages
const ProductsPage = lazy(() => import('../pages/ProductsPage'))
const PostsPage = lazy(() => import('../pages/PostsPage'))
const ProductFormPage = lazy(() => import('../pages/ProductFormPage'))

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    handle: { breadcrumb: 'Home' },
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        handle: { breadcrumb: 'Products' },
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: 'add',
            element: <ProductFormPage />,
            handle: { breadcrumb: 'Add Product' },
          },
          {
            path: 'edit/:id',
            element: <ProductFormPage />,
            handle: {
              breadcrumb: () => `Edit Product`,
            },
          },
        ],
      },
      {
        path: ROUTES.POSTS,
        element: <PostsPage />,
        handle: { breadcrumb: 'Posts' },
      },
    ],
  },
])

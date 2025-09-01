import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { PostFormPage } from '@/pages/PostFormPage'
import { PostsPage } from '@/pages/PostsPage'

import { ROUTES } from './routes.constants'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: {
          breadcrumb: 'Home'
        }
      },
      {
        path: ROUTES.POSTS,
        handle: {
          breadcrumb: 'Posts'
        },
        children: [
          {
            index: true,
            element: <PostsPage />
          },
          {
            path: 'create',
            element: <PostFormPage />,
            handle: {
              breadcrumb: 'Create Post'
            }
          },
          {
            path: 'edit/:id',
            element: <PostFormPage />,
            handle: {
              breadcrumb: 'Edit Post'
            }
          },
        ],
      },
    ],
  },
])

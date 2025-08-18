import { Route } from 'react-router-dom'
import { ROUTES } from './routes.constants.js'

import MainLayout from '@/layout/MainLayout.jsx'
import SimpleLayout from '@/layout/SimpleLayout.jsx'

import MeetingsPage from '@/features/meetings/pages/MeetingsPage.jsx'
import TeacherFormPage from '@/features/teacher/pages/TeacherFormPage.jsx'
import TeachersPage from '@/features/teacher/pages/TeachersPage.jsx'
import AboutPage from '@/pages/AboutPage.jsx'
import DeveloperPage from '@/pages/DeveloperPage.jsx'
import HomePage from '@/pages/HomePage.jsx'
import NotFoundPage from '@/pages/NotFoundPage.jsx'

export const appRoutes = (
  <>

    <Route element={<MainLayout />}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.TEACHERS} element={<TeachersPage />} />
      <Route path={ROUTES.MEETINGS} element={<MeetingsPage />} />
    </Route>


    <Route element={<SimpleLayout />}>
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.DEVELOPER} element={<DeveloperPage />} />
      <Route path="/teachers/new" element={<TeacherFormPage />} />
      <Route path="/teachers/:id/edit" element={<TeacherFormPage />} />
    </Route>

    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
  </>
)

import MainLayout from '@app/layout/MainLayout'
import AppointmentDetailsPage from '@modules/appointment/pages/AppointmentDetailsPage'
import AppointmentFormPage from '@modules/appointment/pages/AppointmentFormPage'
import AppointmentsPage from '@modules/appointment/pages/AppointmentsPage'
import DoctorDetailsPage from '@modules/doctor/pages/DoctorDetailsPage'
import DoctorFormPage from '@modules/doctor/pages/DoctorFormPage'
import DoctorsPage from '@modules/doctor/pages/DoctorsPage'
import PatientDetailsPage from '@modules/patient/pages/PatientDetailsPage'
import PatientFormPage from '@modules/patient/pages/PatientFormPage'
import PatientsPage from '@modules/patient/pages/PatientsPage'
import HomePage from '@pages/HomePage'
import NotFoundPage from '@pages/NotFoundPage'
import { createBrowserRouter, Outlet } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage />, handle: { breadcrumb: 'Home' } },

      {
        path: 'patients',
        element: <Outlet />,
        handle: { breadcrumb: 'Patients' },
        children: [
          { index: true, element: <PatientsPage />, handle: { breadcrumb: 'List' } },
          { path: 'new', element: <PatientFormPage />, handle: { breadcrumb: 'New' } },
          {
            path: ':patientId',
            element: <Outlet />,
            handle: { breadcrumb: ({ params }) => `#${params.patientId}` },
            children: [
              { index: true, element: <PatientDetailsPage />, handle: { breadcrumb: 'Details' } },
              { path: 'edit', element: <PatientFormPage />, handle: { breadcrumb: 'Edit' } },
            ],
          },
        ],
      },

      {
        path: 'doctors',
        element: <Outlet />,
        handle: { breadcrumb: 'Doctors' },
        children: [
          { index: true, element: <DoctorsPage />, handle: { breadcrumb: 'List' } },
          { path: 'new', element: <DoctorFormPage />, handle: { breadcrumb: 'New' } },
          {
            path: ':doctorId',
            element: <Outlet />,
            handle: { breadcrumb: ({ params }) => `#${params.doctorId}` },
            children: [
              { index: true, element: <DoctorDetailsPage />, handle: { breadcrumb: 'Details' } },
              { path: 'edit', element: <DoctorFormPage />, handle: { breadcrumb: 'Edit' } },
            ],
          },
        ],
      },

      {
        path: 'appointments',
        element: <Outlet />,
        handle: { breadcrumb: 'Appointments' },
        children: [
          { index: true, element: <AppointmentsPage />, handle: { breadcrumb: 'List' } },
          { path: 'new', element: <AppointmentFormPage />, handle: { breadcrumb: 'New' } },
          {
            path: ':appointmentId',
            element: <Outlet />,
            handle: { breadcrumb: ({ params }) => `#${params.appointmentId}` },
            children: [
              { index: true, element: <AppointmentDetailsPage />, handle: { breadcrumb: 'Details' } },
              { path: 'edit', element: <AppointmentFormPage />, handle: { breadcrumb: 'Edit' } },
            ],
          },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router

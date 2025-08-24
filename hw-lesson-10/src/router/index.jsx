import MainLayout from '@layouts/MainLayout.jsx';
import BusesPage from '@pages/BusesPage.jsx';
import HomePage from '@pages/HomePage.jsx';
import HotelsPage from '@pages/HotelsPage.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';
import SummaryPage from '@pages/SummaryPage.jsx';
import { FRONT_ROUTES } from '@router/frontRoutes.js';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
  path: FRONT_ROUTES.HOME,
    element: <MainLayout />,
    handle: { crumb: 'Home' },
    children: [
  { index: true, element: <HomePage />, handle: { crumb: 'Home' } },
  { path: FRONT_ROUTES.BUSES.slice(1), element: <BusesPage />, handle: { crumb: 'Buses' } },
  { path: FRONT_ROUTES.HOTELS.slice(1), element: <HotelsPage />, handle: { crumb: 'Hotels' } },
  { path: FRONT_ROUTES.SUMMARY.slice(1), element: <SummaryPage />, handle: { crumb: 'Summary' } },
  { path: FRONT_ROUTES.NOT_FOUND, element: <NotFoundPage />, handle: { crumb: 'Not Found' } },
    ],
  },
]);

export default router

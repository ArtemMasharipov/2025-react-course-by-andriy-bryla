import { Route } from 'react-router-dom'
import { ROUTES, buildRoute } from './routes.constants'

import { MainLayout, SimpleLayout } from '../layout'

import {
  HomePage,
  ShopPage,
  CategoriesPage,
  CategoryProductsPage,
  ProductDetails,
  PaymentRulesPage,
  ContactsPage,
  NotFoundPage,
} from '../pages'

export const appRoutes = (
  <>
    <Route element={<MainLayout />}>
      <Route index element={<HomePage />} />

      <Route path={ROUTES.SHOP} element={<ShopPage />}>
        <Route index element={<CategoriesPage />} />
        <Route path=":categoryId">
          <Route index element={<CategoryProductsPage />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>
      </Route>

      <Route path={ROUTES.PAYMENT_RULES} element={<PaymentRulesPage />} />
    </Route>

    <Route element={<SimpleLayout />}>
      <Route path={ROUTES.CONTACTS} element={<ContactsPage />} />
    </Route>

    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
  </>
)

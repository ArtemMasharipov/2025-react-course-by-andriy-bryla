import { Route } from 'react-router-dom'
import { ROUTES } from './routes.constants'

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

      <Route path="shop" element={<ShopPage />}>
        <Route index element={<CategoriesPage />} />
        <Route path=":categoryId">
          <Route index element={<CategoryProductsPage />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>
      </Route>

      <Route path="payment-rules" element={<PaymentRulesPage />} />
    </Route>

    <Route element={<SimpleLayout />}>
      <Route path="contacts" element={<ContactsPage />} />
    </Route>

    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
  </>
)

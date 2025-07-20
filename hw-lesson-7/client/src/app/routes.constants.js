export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PAYMENT_RULES: '/payment-rules',
  CONTACTS: '/contacts',
  NOT_FOUND: '*',
}

export const buildRoute = {
  shopCategory: categoryId => `/shop/${categoryId}`,
  shopProduct: (categoryId, productId) => `/shop/${categoryId}/${productId}`,
}

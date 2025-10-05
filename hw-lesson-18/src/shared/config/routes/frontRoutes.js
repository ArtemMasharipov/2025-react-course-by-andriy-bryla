import { roles } from '../roles'

export const frontRoutes = {
  pages: {
    HomePage: {
      path: '',
      navigationPath: '/',
      meta: {
        title: 'Головна',
        isInMenu: true,
        requireAuth: false,
      },
    },
    LoginPage: {
      path: 'login',
      navigationPath: '/login',
      meta: {
        title: 'Login page',
        isInMenu: false,
        requireAuth: false,
      },
    },
    UsersPage: {
      path: 'users',
      navigationPath: '/users',
      meta: {
        title: 'Users page',
        isInMenu: true,
        requireAuth: true,
        roles: [roles.admin],
      },
    },
    UserEditPage: {
      path: 'users/edit/:id',
      navigationPath: (id) => `/users/edit/${id ?? ''}`,
      meta: {
        title: 'Редагування користувача',
        isInMenu: false,
        requireAuth: true,
        roles: [roles.admin],
      },
    },
    ProductsPage: {
      path: 'products',
      navigationPath: '/products',
      meta: {
        title: 'Products page',
        isInMenu: true,
        requireAuth: false,
      },
    },
    ProductEditPage: {
      path: 'products/edit/:id?',
      navigationPath: (id) => `/products/edit/${id ?? ''}`,
      meta: {
        title: 'Редагування товару',
        isInMenu: false,
        requireAuth: true,
        roles: [roles.admin, roles.manager],
      },
    },
    ProductAddPage: {
      path: 'products/add',
      navigationPath: '/products/add',
      meta: {
        title: 'Додавання товару',
        isInMenu: false,
        requireAuth: true,
        roles: [roles.admin, roles.manager],
      },
    },
    CartPage: {
      path: 'cart',
      navigationPath: '/cart',
      meta: {
        title: 'Кошик',
        isInMenu: true,
        requireAuth: true,
        roles: [roles.user],
      },
    },
    FavoritesPage: {
      path: 'favorites',
      navigationPath: '/favorites',
      meta: {
        title: 'Улюблені',
        isInMenu: true,
        requireAuth: true,
        roles: [roles.user],
      },
    },
    NotFoundPage: {
      path: '*',
      meta: {
        title: 'Not Found',
        isInMenu: false,
        requireAuth: false,
      },
    },
    ForbiddenPage: {
      path: 'forbidden',
      navigationPath: '/forbidden',
      meta: {
        title: 'Forbidden',
        isInMenu: false,
        requireAuth: false,
      },
    },
  },
}

export function getPagesObjectList() {
  const pagesList = Object.keys(frontRoutes.pages)
  return pagesList.map((page) => frontRoutes.pages[page])
}

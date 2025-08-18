export const ROUTES = {
  HOME: '/',
  TEACHERS: '/teachers',
  MEETINGS: '/meetings',
  ABOUT: '/about',
  DEVELOPER: '/developer',
  NOT_FOUND: '*',
}

export const buildRoute = {
  teacherNew: () => '/teachers/new',
  teacherEdit: id => `/teachers/${id}/edit`,
}

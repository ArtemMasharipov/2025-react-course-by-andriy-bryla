import { getCurrentUser } from '@/app/init/authInit'
import { redirect } from 'react-router'

export const authCheckLoader =
  ({ refreshMutex }) =>
  async (route) => {
    const meta = route?.meta

    const requireAuth = meta?.requireAuth
    const allowedRoles = meta?.roles || []

    let user = await getCurrentUser()

    if (route.path === 'login' && user) {
      throw redirect('/')
    }

    const loaderData = {
      user,
      isAuthenticated: !!user,
    }

    if (requireAuth) {
      if (refreshMutex.isLocked()) {
        await refreshMutex.waitForUnlock()
        user = await getCurrentUser()
        loaderData.user = user
        loaderData.isAuthenticated = !!user
      }

      if (!user) {
        throw redirect('/login')
      }

      if (
        allowedRoles.length > 0 &&
        (!user?.role || !allowedRoles.includes(user.role))
      ) {
        throw redirect('/forbidden')
      }
    }

    return loaderData
  }

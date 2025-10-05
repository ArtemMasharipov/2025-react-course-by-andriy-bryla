import { store } from '@/app/store/store'
import { authApi } from '@/features/auth/api/authApi'
import { auth } from '@/shared/config/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

let authPromise = null

export const getCurrentUser = () => {
  if (authPromise) {
    return authPromise.then(() => store.getState()?.auth?.user)
  }

  authPromise = new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const result = await store.dispatch(authApi.endpoints.refresh.initiate())
          if (!result.data) {
            store.dispatch({ type: 'auth/logout' })
          }
        } else {
          store.dispatch({ type: 'auth/logout' })
        }
      } catch {
        store.dispatch({ type: 'auth/logout' })
      } finally {
        unsubscribe()
        resolve()
      }
    })
  })

  return authPromise.then(() => store.getState()?.auth?.user)
}

// Auto-initialize on module load
getCurrentUser()

function mapFirebaseUser(user) {
  if (!user) return null
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: user.role || 'user',
  }
}
import DbOperations from '@/shared/api/DbOperations'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const auth = getAuth()
          const result = await signInWithEmailAndPassword(auth, email, password)
          const usersDb = new DbOperations('users')
          const userData = await usersDb.getById(result.user.uid)
          return { data: { ...mapFirebaseUser(result.user), ...userData } }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
    }),
    googleLogin: builder.mutation({
      async queryFn() {
        try {
          const auth = getAuth()
          const provider = new GoogleAuthProvider()
          provider.setCustomParameters({ prompt: 'select_account' })
          const result = await signInWithPopup(auth, provider)
          const usersDb = new DbOperations('users')
          if (
            result.user &&
            result.user.metadata.creationTime ===
              result.user.metadata.lastSignInTime
          ) {
            await usersDb.setWithId(result.user.uid, {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL || '',
              role: 'user',
              createdAt: new Date().toISOString(),
            })
          }
          const userData = await usersDb.getById(result.user.uid)
          return { data: { ...mapFirebaseUser(result.user), ...userData } }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
    }),
    signUp: builder.mutation({
      async queryFn({ email, password, displayName }) {
        try {
          const auth = getAuth()
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          )
          const usersDb = new DbOperations('users')
          await usersDb.setWithId(result.user.uid, {
            uid: result.user.uid,
            email: result.user.email,
            displayName,
            photoURL: result.user.photoURL || '',
            role: 'user',
            createdAt: new Date().toISOString(),
          })
          return {
            data: {
              ...mapFirebaseUser(result.user),
              displayName,
              photoURL: result.user.photoURL || '',
            },
          }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
    }),
    refresh: builder.mutation({
      async queryFn() {
        try {
          const auth = getAuth()
          const user = auth.currentUser
          if (!user) return { error: { message: 'Not authenticated' } }
          const usersDb = new DbOperations('users')
          const userData = await usersDb.getById(user.uid)
          return { data: { ...mapFirebaseUser(user), ...userData } }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
    }),
    logout: builder.mutation({
      async queryFn() {
        try {
          const auth = getAuth()
          await signOut(auth)
          return { data: true }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
    }),
  }),
})

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi

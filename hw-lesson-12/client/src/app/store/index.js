import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../../entities/post/model/slice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

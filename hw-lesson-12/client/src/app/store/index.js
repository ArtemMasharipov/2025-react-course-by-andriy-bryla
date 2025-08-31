import { configureStore } from '@reduxjs/toolkit'

import { postReducer } from '../../entities/post'
import { infiniteScrollReducer } from '../../features/infinite-scroll'
import { paginationReducer } from '../../features/pagination'
import { postFormReducer } from '../../features/post-form'

export const store = configureStore({
  reducer: {
    post: postReducer,
    pagination: paginationReducer,
    infiniteScroll: infiniteScrollReducer,
    postForm: postFormReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

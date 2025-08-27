import { configureStore } from '@reduxjs/toolkit'
import { postReducer } from '../entities/post/model/slice'
import { productReducer } from '../entities/product/model/slice'
import { productFilterReducer } from '../features/product-filter/model/slice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    post: postReducer,
    productFilter: productFilterReducer,
  },
})

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATUS } from '../../../shared/config/api'
import {
  addProductThunk,
  deleteProductThunk,
  fetchProductsThunk,
  updateProductThunk,
} from './thunks'

const adapter = createEntityAdapter({
  selectId: p => p._id,
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
})

const initialExtra = { status: REQUEST_STATUS.IDLE, error: null }

const slice = createSlice({
  name: 'product',
  initialState: adapter.getInitialState(initialExtra),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsThunk.pending, state => {
        state.status = REQUEST_STATUS.LOADING
        state.error = null
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED
        adapter.setAll(state, action.payload)
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED
        state.error = action.payload
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload)
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        adapter.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        })
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload)
      })
  },
})

export const productReducer = slice.reducer
export const productAdapter = adapter

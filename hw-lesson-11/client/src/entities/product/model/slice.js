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

const initialExtra = {
  status: REQUEST_STATUS.IDLE,
  error: null,
  addStatus: REQUEST_STATUS.IDLE,
  addError: null,
  updateStatus: REQUEST_STATUS.IDLE,
  updateError: null,
  deleteStatus: REQUEST_STATUS.IDLE,
  deleteError: null,
}

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
      .addCase(addProductThunk.pending, state => {
        state.addStatus = REQUEST_STATUS.LOADING
        state.addError = null
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.addStatus = REQUEST_STATUS.SUCCEEDED
        adapter.addOne(state, action.payload)
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.addStatus = REQUEST_STATUS.FAILED
        state.addError = action.payload
      })
      .addCase(updateProductThunk.pending, state => {
        state.updateStatus = REQUEST_STATUS.LOADING
        state.updateError = null
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.updateStatus = REQUEST_STATUS.SUCCEEDED
        adapter.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        })
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.updateStatus = REQUEST_STATUS.FAILED
        state.updateError = action.payload
      })
      .addCase(deleteProductThunk.pending, state => {
        state.deleteStatus = REQUEST_STATUS.LOADING
        state.deleteError = null
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.SUCCEEDED
        adapter.removeOne(state, action.payload)
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.FAILED
        state.deleteError = action.payload
      })
  },
})

export const productReducer = slice.reducer
export const productAdapter = adapter

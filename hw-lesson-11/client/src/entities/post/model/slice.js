import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATUS } from '../../../shared/config/api'
import { fetchPostsThunk } from './thunks'

const slice = createSlice({
  name: 'post',
  initialState: { items: [], status: REQUEST_STATUS.IDLE, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPostsThunk.pending, state => {
        state.status = REQUEST_STATUS.LOADING
        state.error = null
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED
        state.items = action.payload
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED
        state.error = action.payload
      })
  },
})

export const postReducer = slice.reducer

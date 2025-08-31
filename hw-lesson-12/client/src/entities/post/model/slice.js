import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { REQUEST_STATUS } from '../../../shared/config/api'

import {
  addPostThunk,
  deletePostThunk,
  fetchPostByIdThunk,
  fetchPostsThunk,
  updatePostThunk,
} from './thunks'

const postAdapter = createEntityAdapter({
  selectId: post => post._id,
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
})

const initialState = postAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE,
  error: null,
  viewMode: 'infinite',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
  },
  accumulatedPosts: [],
  addStatus: REQUEST_STATUS.IDLE,
  addError: null,
  updateStatus: REQUEST_STATUS.IDLE,
  updateError: null,
  deleteStatus: REQUEST_STATUS.IDLE,
  deleteError: null,
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    clearErrors: state => {
      state.error = null
      state.addError = null
      state.updateError = null
      state.deleteError = null
    },
    resetAddStatus: state => {
      state.addStatus = REQUEST_STATUS.IDLE
      state.addError = null
    },
    resetUpdateStatus: state => {
      state.updateStatus = REQUEST_STATUS.IDLE
      state.updateError = null
    },
    resetDeleteStatus: state => {
      state.deleteStatus = REQUEST_STATUS.IDLE
      state.deleteError = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsThunk.pending, state => {
        state.status = REQUEST_STATUS.LOADING
        state.error = null
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED
        const { posts, pagination } = action.payload

        if (state.viewMode === 'pagination') {
          // For pagination: always replace all posts with current page
          postAdapter.setAll(state, posts)
          state.accumulatedPosts = posts
        } else {
          // For infinite scroll: accumulate posts
          if (pagination.currentPage === 1) {
            postAdapter.setAll(state, posts)
            state.accumulatedPosts = posts
          } else {
            postAdapter.addMany(state, posts)
            state.accumulatedPosts = [...state.accumulatedPosts, ...posts]
          }
        }

        state.pagination = pagination
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED
        state.error = action.payload
      })
      .addCase(addPostThunk.pending, state => {
        state.addStatus = REQUEST_STATUS.LOADING
        state.addError = null
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        state.addStatus = REQUEST_STATUS.SUCCEEDED
        postAdapter.addOne(state, action.payload)
        state.accumulatedPosts.unshift(action.payload)
      })
      .addCase(addPostThunk.rejected, (state, action) => {
        state.addStatus = REQUEST_STATUS.FAILED
        state.addError = action.payload
      })
      .addCase(updatePostThunk.pending, state => {
        state.updateStatus = REQUEST_STATUS.LOADING
        state.updateError = null
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        state.updateStatus = REQUEST_STATUS.SUCCEEDED
        postAdapter.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        })

        const index = state.accumulatedPosts.findIndex(
          p => p._id === action.payload._id
        )
        if (index !== -1) {
          state.accumulatedPosts[index] = action.payload
        }
      })
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.updateStatus = REQUEST_STATUS.FAILED
        state.updateError = action.payload
      })
      .addCase(deletePostThunk.pending, state => {
        state.deleteStatus = REQUEST_STATUS.LOADING
        state.deleteError = null
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.SUCCEEDED
        postAdapter.removeOne(state, action.payload)
        state.accumulatedPosts = state.accumulatedPosts.filter(
          p => p._id !== action.payload
        )
      })
      .addCase(deletePostThunk.rejected, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.FAILED
        state.deleteError = action.payload
      })
      .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
        postAdapter.upsertOne(state, action.payload)
        // Also add to accumulatedPosts if not already there
        const exists = state.accumulatedPosts.find(
          p => p._id === action.payload._id
        )
        if (!exists) {
          state.accumulatedPosts.push(action.payload)
        }
      })
  },
})

export const {
  setViewMode,
  clearErrors,
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
} = postSlice.actions
export { postAdapter }
export default postSlice.reducer

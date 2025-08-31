import { createSlice } from '@reduxjs/toolkit'

import { REQUEST_STATUS } from '../../../shared/config/api'

const initialState = {
  posts: [],
  currentPage: 1,
  hasNextPage: false,
  status: REQUEST_STATUS.IDLE,
  error: null,
  isFetchingMore: false,
  pageMarkers: [],
  boundaryIndex: 0,
}

const infiniteScrollSlice = createSlice({
  name: 'infiniteScroll',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      const { posts, page } = action.payload
      if (page === 1) {
        state.posts = posts
        state.pageMarkers = [posts.length - 1]
      } else {
        const existingIds = new Set(state.posts.map(post => post._id))
        const newPosts = posts.filter(post => !existingIds.has(post._id))
        state.posts = [...state.posts, ...newPosts]
        state.pageMarkers.push(state.posts.length - 1)
      }
      state.boundaryIndex = state.posts.length - 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setHasNextPage: (state, action) => {
      state.hasNextPage = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setFetchingMore: (state, action) => {
      state.isFetchingMore = action.payload
    },
    clearPosts: state => {
      state.posts = []
      state.currentPage = 1
      state.hasNextPage = false
      state.pageMarkers = []
      state.boundaryIndex = 0
    },
    reset: state => {
      state.posts = []
      state.currentPage = 1
      state.hasNextPage = false
      state.status = REQUEST_STATUS.IDLE
      state.error = null
      state.isFetchingMore = false
      state.pageMarkers = []
      state.boundaryIndex = 0
    },
  },
})

export const {
  addPosts,
  setCurrentPage,
  setHasNextPage,
  setStatus,
  setError,
  setFetchingMore,
  clearPosts,
  reset,
} = infiniteScrollSlice.actions

export default infiniteScrollSlice.reducer

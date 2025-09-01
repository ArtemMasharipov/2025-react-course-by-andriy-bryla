import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import {
  addPostThunk,
  deletePostThunk,
  fetchPostByIdThunk,
  fetchPostsThunk,
  updatePostThunk,
} from './thunks'

const postsAdapter = createEntityAdapter({
  selectId: post => post._id,
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
})

const initialState = postsAdapter.getInitialState({
  loading: {
    fetch: false,
    add: false,
    update: false,
    delete: false,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  ui: {
    viewMode: 'pagination',
    pageMarkers: [],
    isLoadingMore: false,
    isLoadingPage: false,
  },
  errors: {
    fetch: null,
    add: null,
    update: null,
    delete: null,
  },
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Loading states
    setFetchLoading: (state, action) => {
      state.loading.fetch = action.payload
    },
    setLoadingMore: (state, action) => {
      state.ui.isLoadingMore = action.payload
    },
    setLoadingPage: (state, action) => {
      state.ui.isLoadingPage = action.payload
    },

    // Pagination
    setPagination: (state, action) => {
      const { currentPage, totalPages, totalItems, itemsPerPage } =
        action.payload
      state.pagination = {
        currentPage: currentPage || state.pagination.currentPage,
        totalPages: totalPages || state.pagination.totalPages,
        totalItems: totalItems || state.pagination.totalItems,
        itemsPerPage: itemsPerPage || state.pagination.itemsPerPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      }
    },

    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
      state.pagination.hasNextPage =
        action.payload < state.pagination.totalPages
      state.pagination.hasPrevPage = action.payload > 1
    },

    // View mode
    setViewMode: (state, action) => {
      state.ui.viewMode = action.payload
      if (action.payload === 'pagination') {
        state.ui.pageMarkers = []
      }
    },

    // Page markers for infinite scroll
    addPageMarker: (state, action) => {
      const marker = action.payload
      if (!state.ui.pageMarkers.includes(marker)) {
        state.ui.pageMarkers.push(marker)
      }
    },

    resetPageMarkers: state => {
      state.ui.pageMarkers = []
    },

    // Clear states
    clearErrors: state => {
      state.errors = { fetch: null, add: null, update: null, delete: null }
    },

    resetLoadingStates: state => {
      state.loading = { fetch: false, add: false, update: false, delete: false }
      state.ui.isLoadingMore = false
      state.ui.isLoadingPage = false
    },
  },

  extraReducers: builder => {
    builder
      // Fetch posts
      .addCase(fetchPostsThunk.pending, (state, action) => {
        const { page = 1 } = action.meta.arg || {}
        if (page === 1) {
          state.loading.fetch = true
        } else {
          state.ui.isLoadingMore = true
        }
        state.errors.fetch = null
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        const { posts, pagination } = action.payload
        const { page = 1 } = action.meta.arg || {}

        if (state.ui.viewMode === 'pagination' || page === 1) {
          postsAdapter.setAll(state, posts)
          if (page === 1) {
            state.ui.pageMarkers = []
            // Add marker for first page if we're in infinite mode
            if (state.ui.viewMode === 'infinite' && posts.length > 0) {
              state.ui.pageMarkers.push(posts.length - 1)
            }
          }
        } else {
          // Infinite scroll: add new posts
          const existingIds = new Set(state.ids)
          const newPosts = posts.filter(post => !existingIds.has(post._id))
          postsAdapter.addMany(state, newPosts)

          // Add page marker at the end of this page
          if (newPosts.length > 0) {
            const pageEndIndex = state.ids.length - 1
            state.ui.pageMarkers.push(pageEndIndex)
          }
        }

        state.pagination = {
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          totalItems: pagination.total,
          itemsPerPage: pagination.limit || 10,
          hasNextPage: pagination.hasNextPage,
          hasPrevPage: pagination.hasPrevPage,
        }

        state.loading.fetch = false
        state.ui.isLoadingMore = false
        state.ui.isLoadingPage = false
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading.fetch = false
        state.ui.isLoadingMore = false
        state.ui.isLoadingPage = false
        state.errors.fetch = action.payload
      })

      // Add post
      .addCase(addPostThunk.pending, state => {
        state.loading.add = true
        state.errors.add = null
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload)
        state.loading.add = false
        // Update total items count
        state.pagination.totalItems += 1
      })
      .addCase(addPostThunk.rejected, (state, action) => {
        state.loading.add = false
        state.errors.add = action.payload
      })

      // Update post
      .addCase(updatePostThunk.pending, state => {
        state.loading.update = true
        state.errors.update = null
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        postsAdapter.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        })
        state.loading.update = false
      })
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.loading.update = false
        state.errors.update = action.payload
      })

      // Delete post
      .addCase(deletePostThunk.pending, state => {
        state.loading.delete = true
        state.errors.delete = null
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        postsAdapter.removeOne(state, action.payload)
        state.loading.delete = false
        // Update total items count
        state.pagination.totalItems = Math.max(
          0,
          state.pagination.totalItems - 1
        )
      })
      .addCase(deletePostThunk.rejected, (state, action) => {
        state.loading.delete = false
        state.errors.delete = action.payload
      })

      // Fetch post by ID
      .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
        postsAdapter.upsertOne(state, action.payload)
      })
  },
})

export const {
  setFetchLoading,
  setLoadingMore,
  setLoadingPage,
  setPagination,
  setCurrentPage,
  setViewMode,
  addPageMarker,
  resetPageMarkers,
  clearErrors,
  resetLoadingStates,
} = postsSlice.actions

export { postsAdapter }
export default postsSlice.reducer

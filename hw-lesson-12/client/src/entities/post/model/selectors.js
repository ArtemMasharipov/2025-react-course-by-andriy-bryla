import { createSelector } from '@reduxjs/toolkit'
import { postsAdapter } from './slice'

// Base state selector
export const selectPostsState = state => state.posts

// Entity selectors
export const selectAllPosts = createSelector(
  [selectPostsState],
  postsAdapter.getSelectors().selectAll
)

export const selectPostById = createSelector(
  [selectPostsState, (_, id) => id],
  (state, id) => postsAdapter.getSelectors().selectById(state, id)
)

export const selectPostIds = createSelector(
  [selectPostsState],
  postsAdapter.getSelectors().selectIds
)

export const selectPostEntities = createSelector(
  [selectPostsState],
  postsAdapter.getSelectors().selectEntities
)

// Loading selectors
export const selectPostStatus = createSelector([selectPostsState], state =>
  state.loading.fetch ? 'loading' : 'succeeded'
)

export const selectIsLoading = createSelector(
  [selectPostsState],
  state => state.loading.fetch
)

export const selectIsLoadingMore = createSelector(
  [selectPostsState],
  state => state.ui.isLoadingMore
)

export const selectIsLoadingPage = createSelector(
  [selectPostsState],
  state => state.ui.isLoadingPage
)

export const selectAddPostStatus = createSelector([selectPostsState], state =>
  state.loading.add ? 'loading' : 'succeeded'
)

export const selectUpdatePostStatus = createSelector(
  [selectPostsState],
  state => (state.loading.update ? 'loading' : 'succeeded')
)

export const selectDeletePostStatus = createSelector(
  [selectPostsState],
  state => (state.loading.delete ? 'loading' : 'succeeded')
)

// Pagination selectors
export const selectPagination = createSelector(
  [selectPostsState],
  state => state.pagination
)

export const selectCurrentPage = createSelector(
  [selectPagination],
  pagination => pagination.currentPage
)

export const selectTotalPages = createSelector(
  [selectPagination],
  pagination => pagination.totalPages
)

export const selectTotalItems = createSelector(
  [selectPagination],
  pagination => pagination.totalItems
)

export const selectItemsPerPage = createSelector(
  [selectPagination],
  pagination => pagination.itemsPerPage
)

export const selectHasNextPage = createSelector(
  [selectPagination],
  pagination => pagination.hasNextPage
)

export const selectHasPrevPage = createSelector(
  [selectPagination],
  pagination => pagination.hasPrevPage
)

// UI selectors
export const selectViewMode = createSelector(
  [selectPostsState],
  state => state.ui.viewMode
)

export const selectPageMarkers = createSelector(
  [selectPostsState],
  state => state.ui.pageMarkers
)

// Error selectors
export const selectErrors = createSelector(
  [selectPostsState],
  state => state.errors
)

export const selectPostError = createSelector(
  [selectErrors],
  errors => errors.fetch
)

export const selectAddPostError = createSelector(
  [selectErrors],
  errors => errors.add
)

export const selectUpdatePostError = createSelector(
  [selectErrors],
  errors => errors.update
)

export const selectDeletePostError = createSelector(
  [selectErrors],
  errors => errors.delete
)

// Combined selectors for compatibility
export const selectFetchError = selectPostError

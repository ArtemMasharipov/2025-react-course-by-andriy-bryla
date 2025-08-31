import { createSelector } from '@reduxjs/toolkit'

export const selectInfiniteScrollState = state => state.infiniteScroll

export const selectInfinitePosts = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.posts
)

export const selectInfiniteCurrentPage = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.currentPage
)

export const selectInfiniteHasNextPage = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.hasNextPage
)

export const selectInfiniteStatus = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.status
)

export const selectInfiniteError = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.error
)

export const selectInfiniteIsLoading = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.status === 'loading'
)

// New selectors for enhanced functionality
export const selectPageMarkers = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.pageMarkers
)

export const selectIsFetchingMore = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.isFetchingMore
)

export const selectBoundaryIndex = createSelector(
  [selectInfiniteScrollState],
  infiniteScrollState => infiniteScrollState.boundaryIndex
)

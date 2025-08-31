import { createSelector } from '@reduxjs/toolkit'

export const selectPaginationState = state => state.pagination

export const selectCurrentPage = createSelector(
  [selectPaginationState],
  paginationState => paginationState.currentPage
)

export const selectTotalPages = createSelector(
  [selectPaginationState],
  paginationState => paginationState.totalPages
)

export const selectTotalItems = createSelector(
  [selectPaginationState],
  paginationState => paginationState.totalItems
)

export const selectItemsPerPage = createSelector(
  [selectPaginationState],
  paginationState => paginationState.itemsPerPage
)

export const selectHasNextPage = createSelector(
  [selectPaginationState],
  paginationState => paginationState.hasNextPage
)

export const selectHasPrevPage = createSelector(
  [selectPaginationState],
  paginationState => paginationState.hasPrevPage
)

// New selectors for enhanced functionality
export const selectIsLoadingPage = createSelector(
  [selectPaginationState],
  paginationState => paginationState.isLoadingPage
)

export const selectBoundaryIndex = createSelector(
  [selectPaginationState],
  paginationState => paginationState.boundaryIndex
)

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  hasNextPage: false,
  hasPrevPage: false,
  isLoadingPage: false,
  boundaryIndex: 0,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPagination: (state, action) => {
      const { currentPage, totalPages, totalItems, itemsPerPage } = action.payload
      state.currentPage = currentPage
      state.totalPages = totalPages
      state.totalItems = totalItems
      state.itemsPerPage = itemsPerPage || state.itemsPerPage
      state.hasNextPage = currentPage < totalPages
      state.hasPrevPage = currentPage > 1
      state.boundaryIndex = (currentPage * state.itemsPerPage) - 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
      state.hasNextPage = action.payload < state.totalPages
      state.hasPrevPage = action.payload > 1
      state.boundaryIndex = (action.payload * state.itemsPerPage) - 1
    },
    setLoadingPage: (state, action) => {
      state.isLoadingPage = action.payload
    },
    resetPagination: (state) => {
      state.currentPage = 1
      state.totalPages = 1
      state.totalItems = 0
      state.hasNextPage = false
      state.hasPrevPage = false
      state.isLoadingPage = false
      state.boundaryIndex = 0
    },
  },
})

export const {
  setPagination,
  setCurrentPage,
  setLoadingPage,
  resetPagination,
} = paginationSlice.actions

export default paginationSlice.reducer

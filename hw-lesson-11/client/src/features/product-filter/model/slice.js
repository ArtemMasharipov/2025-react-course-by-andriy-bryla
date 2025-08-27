import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'productFilter',
  initialState: { term: '' },
  reducers: {
    setFilterTerm: (state, action) => {
      state.term = action.payload
    },
    clearFilterTerm: state => {
      state.term = ''
    },
  },
})

export const { setFilterTerm, clearFilterTerm } = slice.actions
export const productFilterReducer = slice.reducer
export const selectProductFilterTerm = state => state.productFilter.term

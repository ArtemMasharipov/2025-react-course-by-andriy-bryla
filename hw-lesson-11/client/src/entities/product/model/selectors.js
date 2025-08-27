import { createSelector } from '@reduxjs/toolkit'
import { productAdapter } from './slice'

// Base slice selector
const selectProductState = state => state.product

// Entity adapter selectors (renamed for clarity via destructuring)
const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  // selectIds removed (unused)
} = productAdapter.getSelectors(selectProductState)

// Additional slice fields
export const selectProductsStatus = state => selectProductState(state).status
export const selectProductsError = state => selectProductState(state).error

// CRUD operation states
export const selectAddProductStatus = state => selectProductState(state).addStatus
export const selectAddProductError = state => selectProductState(state).addError
export const selectUpdateProductStatus = state => selectProductState(state).updateStatus
export const selectUpdateProductError = state => selectProductState(state).updateError
export const selectDeleteProductStatus = state => selectProductState(state).deleteStatus
export const selectDeleteProductError = state => selectProductState(state).deleteError

export { selectAllProducts, selectProductById }

// Offline filtered products (case-insensitive substring on name)
export const selectFilteredProducts = createSelector(
  [selectAllProducts, state => state.productFilter?.term || ''],
  (products, term) => {
    const q = term.trim().toLowerCase()
    if (!q) return products
    return products.filter(p => p.name?.toLowerCase().includes(q))
  }
)

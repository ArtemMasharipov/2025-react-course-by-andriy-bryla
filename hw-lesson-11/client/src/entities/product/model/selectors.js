import { createSelector } from '@reduxjs/toolkit'
import { productAdapter } from './slice'

// Base slice selector
const selectProductState = state => state.product

// Entity adapter selectors
const { selectAll: selectAllProducts } =
  productAdapter.getSelectors(selectProductState)

// Additional slice fields
export const selectProductsStatus = createSelector(
  [selectProductState],
  state => state.status
)

export const selectProductsError = createSelector(
  [selectProductState],
  state => state.error
)

// Optimized filtered products selector with better memoization
export const selectFilteredProducts = createSelector(
  [selectAllProducts, state => state.productFilter?.term || ''],
  (products, term) => {
    if (!term.trim()) return products
    const query = term.trim().toLowerCase()
    return products.filter(product =>
      product.name?.toLowerCase().includes(query)
    )
  }
)

// New optimized selectors
export const selectProductsCount = createSelector(
  [selectAllProducts],
  products => products.length
)

export const selectFilteredProductsCount = createSelector(
  [selectFilteredProducts],
  products => products.length
)

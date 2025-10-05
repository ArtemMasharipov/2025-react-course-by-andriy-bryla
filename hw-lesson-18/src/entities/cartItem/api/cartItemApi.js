import { DbOperations } from '@/shared/api'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

const db = new DbOperations('carts')

const handleApiCall = async (apiCall) => {
  try {
    const data = await apiCall()
    return { data }
  } catch (error) {
    return { error: { message: error.message } }
  }
}

export const cartItemApi = createApi({
  reducerPath: 'cartItemApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['CartItem'],
  endpoints: (builder) => ({
    getUserCart: builder.query({
      async queryFn(userId) {
        return handleApiCall(() => db.getCartByUserId(userId))
      },
      providesTags: ['CartItem'],
    }),
    updateCartItem: builder.mutation({
      async queryFn({ userId, productId, product, action = 'add' }) {
        return handleApiCall(async () => {
          const cart = await db.getCartByUserId(userId)
          const current = cart[productId] || { ...product, quantity: 0 }
          
          let newQuantity = current.quantity
          switch (action) {
            case 'add':
              newQuantity += 1
              break
            case 'decrease':
              newQuantity = Math.max(1, newQuantity - 1)
              break
            case 'remove':
              newQuantity = 0
              break
          }
          
          const updates = newQuantity > 0 
            ? { [productId]: { ...current, ...product, quantity: newQuantity } }
            : { [productId]: null }
            
          await db.updateCart(userId, updates)
          return true
        })
      },
      invalidatesTags: ['CartItem'],
    }),
  }),
})

export const {
  useGetUserCartQuery,
  useUpdateCartItemMutation,
} = cartItemApi

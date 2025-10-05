import { DbOperations } from '@/shared/api'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
const db = new DbOperations('favorites')

export const favoriteItemApi = createApi({
  reducerPath: 'favoriteItemApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['FavoriteItem'],
  endpoints: (builder) => ({
    getUserFavorites: builder.query({
      async queryFn(userId) {
        try {
          const favorites = await db.getCartByUserId(userId)
          return { data: favorites || {} }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
      providesTags: ['FavoriteItem'],
    }),
    addToFavorites: builder.mutation({
      async queryFn({ userId, productId, product }) {
        try {
          let favorites = await db.getCartByUserId(userId)
          if (!favorites || Object.keys(favorites).length === 0) {
            favorites = { [productId]: product }
            await db.setCartByUserId(userId, favorites)
            return { data: true }
          }
          favorites[productId] = product
          await db.setCartByUserId(userId, favorites)
          return { data: true }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
      invalidatesTags: ['FavoriteItem'],
    }),
    removeFromFavorites: builder.mutation({
      async queryFn({ userId, productId }) {
        try {
          let favorites = await db.getCartByUserId(userId)
          if (favorites && favorites[productId]) {
            delete favorites[productId]
            await db.setCartByUserId(userId, favorites)
          }
          return { data: true }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
      invalidatesTags: ['FavoriteItem'],
    }),
    isFavorite: builder.query({
      async queryFn({ userId, productId }) {
        try {
          const favorites = await db.getCartByUserId(userId)
          const isFav = favorites && favorites[productId]
          return { data: !!isFav }
        } catch (error) {
          return { error: { message: error.message } }
        }
      },
      providesTags: ['FavoriteItem'],
    }),
  }),
})

export const {
  useGetUserFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useIsFavoriteQuery,
} = favoriteItemApi

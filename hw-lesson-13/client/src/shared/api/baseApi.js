import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: h => {
      h.set('Content-Type', 'application/json')
      return h
    },
  }),
  tagTypes: ['Post'],
  endpoints: () => ({}),
})

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: h => {
    h.set('Content-Type', 'application/json')
    return h
  },
})

const baseQueryWithTimeout = async (args, api, extra) => {
  const c = new AbortController()
  const id = setTimeout(() => c.abort(), 60000)
  try {
    return await rawBaseQuery({ ...args, signal: c.signal }, api, extra)
  } finally {
    clearTimeout(id)
  }
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithTimeout,
  tagTypes: ['Post'],
  endpoints: () => ({}),
})

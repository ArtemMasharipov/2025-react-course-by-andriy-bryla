import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import DbOperations from './DbOperations'


export function createEntityApi(entityName, collectionName) {
  const db = new DbOperations(collectionName)
  const tagType = entityName.charAt(0).toUpperCase() + entityName.slice(1)

  return createApi({
    reducerPath: `${entityName}Api`,
    baseQuery: fakeBaseQuery(),
    tagTypes: [tagType],
    endpoints: (builder) => ({
      [`getAll${tagType}s`]: builder.query({
        async queryFn() {
          try {
            const data = await db.getAll()
            return { data }
          } catch (error) {
            console.error(`Error fetching all ${entityName}s:`, error)
            return { error: { message: error.message || 'Failed to fetch data' } }
          }
        },
        providesTags: [tagType],
      }),

      [`get${tagType}ById`]: builder.query({
        async queryFn(id) {
          try {
            const data = await db.getById(id)
            return { data }
          } catch (error) {
            console.error(`Error fetching ${entityName} by id ${id}:`, error)
            return { error: { message: error.message || 'Failed to fetch item' } }
          }
        },
        providesTags: [tagType],
      }),

      [`add${tagType}`]: builder.mutation({
        async queryFn(data) {
          try {
            await db.add(data)
            return { data: true }
          } catch (error) {
            return { error: { message: error.message } }
          }
        },
        invalidatesTags: [tagType],
      }),

      [`update${tagType}`]: builder.mutation({
        async queryFn({ id, data }) {
          try {
            await db.update(id, data)
            return { data: true }
          } catch (error) {
            return { error: { message: error.message } }
          }
        },
        invalidatesTags: [tagType],
      }),

      [`delete${tagType}`]: builder.mutation({
        async queryFn(id) {
          try {
            await db.delete(id)
            return { data: true }
          } catch (error) {
            return { error: { message: error.message } }
          }
        },
        invalidatesTags: [tagType],
      }),
    }),
  })
}

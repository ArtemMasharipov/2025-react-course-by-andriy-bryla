import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { FirebaseRepo } from '@shared/firebase'


export function createCrudApi({ 
  db, 
  entity, 
  collection, 
  cascadeDeleteCollections = [] 
}) {
  const repo = new FirebaseRepo(db, collection)
  const entityTag = entity.toUpperCase()
  
  const createErrorResponse = (error) => ({ 
    error: { status: 500, message: error.message } 
  })
  
  const createSuccessResponse = (data) => ({ data })
  
  const handleAsyncOperation = async (operation) => {
    try {
      const result = await operation()
      return createSuccessResponse(result)
    } catch (error) {
      return createErrorResponse(error)
    }
  }
  
  return createApi({
    reducerPath: `${entity.toLowerCase()}Api`,
    baseQuery: fakeBaseQuery(),
    tagTypes: [entityTag],
    
    endpoints: (builder) => ({
      getList: builder.query({
        queryFn: (params = {}) => 
          handleAsyncOperation(() => repo.getAllPaginated(params)),
        
        providesTags: (result) => {
          const items = result?.data || []
          return [
            { type: entityTag, id: 'LIST' },
            ...items.map(({ id }) => ({ type: entityTag, id }))
          ]
        },
        
        serializeQueryArgs: ({ queryArgs = {} }) => {
          const { perPage = 10, sort, filters = [], lastCursor } = queryArgs
          const sortKey = sort ? `${sort.field}-${sort.dir}` : 'default'
          return [perPage, sortKey, JSON.stringify(filters), lastCursor?.id].join('|')
        },
      }),
      
      getById: builder.query({
        queryFn: (id) => 
          handleAsyncOperation(async () => {
            const data = await repo.get(id)
            if (!data) throw new Error(`${entity} not found`)
            return data
          }),
        
        providesTags: (_, __, id) => [{ type: entityTag, id }],
      }),
      
      create: builder.mutation({
        queryFn: (data) => 
          handleAsyncOperation(() => repo.create(data)),
        
        invalidatesTags: [{ type: entityTag, id: 'LIST' }],
      }),
      
      update: builder.mutation({
        queryFn: ({ id, ...patch }) => 
          handleAsyncOperation(() => repo.update(id, patch)),
        
        invalidatesTags: (_, __, { id }) => [
          { type: entityTag, id },
          { type: entityTag, id: 'LIST' }
        ],
      }),
      
      delete: builder.mutation({
        queryFn: ({ id }) => 
          handleAsyncOperation(async () => {
            cascadeDeleteCollections.length > 0
              ? await repo.removeCascadeSimple(id, cascadeDeleteCollections)
              : await repo.remove(id)
            return { id }
          }),
        
        invalidatesTags: (_, __, { id }) => {
          const baseTags = [
            { type: entityTag, id },
            { type: entityTag, id: 'LIST' }
          ]
          
          const cascadeTags = cascadeDeleteCollections
            .map(collection => {
              if (collection === 'appointments') {
                return { type: 'APPOINTMENT', id: 'LIST' }
              }
              return { 
                type: collection.charAt(0).toUpperCase() + collection.slice(1), 
                id: 'LIST' 
              }
            })
          
          return [...baseTags, ...cascadeTags]
        },
      }),
    }),
  })
}
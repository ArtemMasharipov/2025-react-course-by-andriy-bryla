import { baseApi } from '../../../shared/api/baseApi'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/api/v1/posts?page=${page}&limit=${limit}`,
      providesTags: result =>
        result?.posts
          ? [
              ...result.posts.map(({ _id }) => ({ type: 'Post', id: _id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    getPost: builder.query({
      query: id => `/api/v1/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation({
      query: postData => ({
        url: '/api/v1/posts',
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...postData }) => ({
        url: `/api/v1/posts/${id}`,
        method: 'PUT',
        body: postData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),

    deletePost: builder.mutation({
      query: id => ({
        url: `/api/v1/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi

import { createAsyncThunk } from '@reduxjs/toolkit'

import { postApi } from '../api/postApi'
import { setLoadingPage, setPagination } from './slice'

export const fetchPostsThunk = createAsyncThunk(
  'post/fetchPosts',
  async ({ page = 1, limit = 10 } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await postApi.getPosts({ page, limit })

      dispatch(
        setPagination({
          currentPage: page,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems,
          itemsPerPage: limit,
        })
      )

      dispatch(setLoadingPage(false))

      return response
    } catch (error) {
      dispatch(setLoadingPage(false))
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch posts'
      )
    }
  }
)

export const addPostThunk = createAsyncThunk(
  'post/addPost',
  async (postData, { rejectWithValue }) => {
    try {
      const post = await postApi.createPost(postData)
      return post
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create post'
      )
    }
  }
)

export const updatePostThunk = createAsyncThunk(
  'post/updatePost',
  async ({ id, ...postData }, { rejectWithValue }) => {
    try {
      const post = await postApi.updatePost(id, postData)
      return post
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update post'
      )
    }
  }
)

export const deletePostThunk = createAsyncThunk(
  'post/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await postApi.deletePost(postId)
      return postId
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete post'
      )
    }
  }
)

export const fetchPostByIdThunk = createAsyncThunk(
  'post/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      const post = await postApi.getPost(id)
      return post
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch post'
      )
    }
  }
)

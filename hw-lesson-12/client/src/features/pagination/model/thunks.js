import { createAsyncThunk } from '@reduxjs/toolkit'

import { postApi } from '../../../entities/post/api/postApi'
import { setPosts } from '../../../entities/post/model/slice'
import { REQUEST_STATUS } from '../../../shared/config/api'
import {
  addInfinitePosts,
  setError,
  setLoadingPage,
  setPagination,
  setStatus,
} from './slice'

export const fetchPaginatedPostsThunk = createAsyncThunk(
  'pagination/fetchPaginatedPosts',
  async ({ page = 1, limit = 10 } = {}, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setStatus(REQUEST_STATUS.LOADING))
      dispatch(setError(null))

      const response = await postApi.getPosts({ page, limit })

      dispatch(
        setPagination({
          currentPage: page,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems,
          itemsPerPage: limit,
        })
      )

      dispatch(setPosts(response.posts))

      dispatch(setLoadingPage(false))

      dispatch(setStatus(REQUEST_STATUS.SUCCEEDED))
      return response
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch posts'
      dispatch(setError(errorMessage))
      dispatch(setStatus(REQUEST_STATUS.FAILED))
      dispatch(setLoadingPage(false))
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchInfinitePostsThunk = createAsyncThunk(
  'pagination/fetchInfinitePosts',
  async (
    { page = 1, limit = 10 } = {},
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const state = getState()
      const currentInfinitePosts = state.pagination.infinitePosts
      const postsPerPage = limit
      const expectedPostsCount = page * postsPerPage

      if (currentInfinitePosts.length >= expectedPostsCount && page > 1) {
        return { posts: [], pagination: state.pagination }
      }

      if (page === 1) {
        dispatch(setStatus(REQUEST_STATUS.LOADING))
        dispatch(setError(null))
      }

      const response = await postApi.getPosts({ page, limit })

      dispatch(
        setPagination({
          currentPage: page,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems,
          itemsPerPage: limit,
        })
      )

      dispatch(addInfinitePosts({ posts: response.posts, page }))

      if (page === 1) {
        dispatch(setStatus(REQUEST_STATUS.SUCCEEDED))
      }

      return response
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch posts'
      dispatch(setError(errorMessage))
      dispatch(setStatus(REQUEST_STATUS.FAILED))
      return rejectWithValue(errorMessage)
    }
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { postApi } from '../api/postApi'

export const fetchPostsThunk = createAsyncThunk(
  'post/list',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await postApi.list()
      return data
    } catch (e) {
      return rejectWithValue(e.message || 'Failed to fetch posts')
    }
  }
)

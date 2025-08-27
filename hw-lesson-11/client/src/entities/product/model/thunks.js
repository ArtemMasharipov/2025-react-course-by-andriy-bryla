import { createAsyncThunk } from '@reduxjs/toolkit'
import { productApi } from '../api/productApi'

export const fetchProductsThunk = createAsyncThunk(
  'product/list',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await productApi.list()
      return data
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || 'Failed to fetch products'
      )
    }
  }
)

export const addProductThunk = createAsyncThunk(
  'product/add',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await productApi.create(payload)
      return data
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || 'Failed to create product'
      )
    }
  }
)

export const deleteProductThunk = createAsyncThunk(
  'product/delete',
  async (id, { rejectWithValue }) => {
    try {
      await productApi.remove(id)
      return id
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || 'Failed to delete product'
      )
    }
  }
)

export const updateProductThunk = createAsyncThunk(
  'product/update',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const { data: updatedProduct } = await productApi.update(id, data)
      return updatedProduct
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || 'Failed to update product'
      )
    }
  }
)

import { createSlice } from '@reduxjs/toolkit'

import { REQUEST_STATUS } from '../../../shared/config/api'

const initialState = {
  formData: {
    title: '',
    content: '',
    author: '',
  },
  status: REQUEST_STATUS.IDLE,
  error: null,
}

const postFormSlice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    resetForm: state => {
      state.formData = {
        title: '',
        content: '',
        author: '',
      }
      state.status = REQUEST_STATUS.IDLE
      state.error = null
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setFormData, resetForm, setStatus, setError } =
  postFormSlice.actions

export const selectFormData = state => state.postForm.formData
export const selectPostFormStatus = state => state.postForm.status
export const selectPostFormError = state => state.postForm.error

export default postFormSlice.reducer

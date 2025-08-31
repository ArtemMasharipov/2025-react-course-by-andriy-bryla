import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constants'
import { addPostThunk, selectAddPostStatus, selectUpdatePostStatus, updatePostThunk } from '@/entities/post'

import { selectFormData, setFormData } from '../model/slice'

export const PostForm = ({ postId = null }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formData = useSelector(selectFormData)
  const addStatus = useSelector(selectAddPostStatus)
  const updateStatus = useSelector(selectUpdatePostStatus)

  const isEditing = !!postId
  const isLoading = addStatus === 'loading' || updateStatus === 'loading'

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isEditing) {
        await dispatch(updatePostThunk({ id: postId, ...formData })).unwrap()
      } else {
        await dispatch(addPostThunk(formData)).unwrap()
      }
      navigate(ROUTES.POSTS)
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    dispatch(setFormData({ [name]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-emerald-900 mb-6">
        {isEditing ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            value={formData.content}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.POSTS)}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

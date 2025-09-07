import { PostForm } from '@entities/post'
import { ROUTES } from '@app/router/routes.constants'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation
} from '@entities/post/api/postsApi'

export const PostFormPage = () => {
  const navigate = useNavigate()
  const { id: postId } = useParams()
  const isEditing = Boolean(postId)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  })

  const { data: post, isLoading } = useGetPostQuery(postId, {
    skip: !isEditing
  })

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  useEffect(() => {
    if (isEditing && post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        author: post.author || ''
      })
    }
  }, [post, isEditing])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isEditing) {
        await updatePost({ id: postId, ...formData }).unwrap()
      } else {
        await createPost(formData).unwrap()
      }
      navigate(ROUTES.POSTS)
    } catch (error) {
      // Errors are handled by RTK Query
    }
  }

  if (isEditing && isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="ml-2 text-emerald-600">Loading post...</span>
        </div>
      </div>
    )
  }

  const isSubmitting = isCreating || isUpdating

  return (
    <div className="container mx-auto px-4 py-8">
      <PostForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        title={isEditing ? 'Edit Post' : 'Create New Post'}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {isEditing ? 'Updating...' : 'Creating...'}
            </span>
          ) : (
            isEditing ? 'Update Post' : 'Create Post'
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate(ROUTES.POSTS)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </button>
      </PostForm>
    </div>
  )
}

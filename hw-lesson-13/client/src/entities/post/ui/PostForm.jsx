import { ROUTES } from '@/app/router/routes.constants'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useCreatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation
} from '../api/postsApi'

export const PostForm = () => {
  const navigate = useNavigate()
  const { id: postId } = useParams()
  const isEditing = Boolean(postId)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  })

  const { data: singlePost, isLoading: isLoadingSingle } = useGetPostQuery(postId, {
    skip: !isEditing
  })

  const { data: postsData } = useGetPostsQuery({ page: 1, limit: 100 }, {
    skip: !isEditing
  })

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  useEffect(() => {
    console.log('PostForm useEffect:', { isEditing, postId, singlePost, postsData })

    if (isEditing) {
      let existingPost = singlePost

      if (!existingPost && postsData?.posts) {
        existingPost = postsData.posts.find(post => post._id === postId)
        console.log('Found in posts list:', existingPost)
      }

      if (existingPost) {
        console.log('Setting form data:', existingPost)
        setFormData({
          title: existingPost.title || '',
          content: existingPost.content || '',
          author: existingPost.author || ''
        })
      }
    }
  }, [singlePost, postsData, postId, isEditing])

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
      console.error('Error saving post:', error)
    }
  }

  if (isEditing && isLoadingSingle) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-emerald-600">Loading post...</span>
      </div>
    )
  }

  const isSubmitting = isCreating || isUpdating

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-emerald-900 mb-6">
        {isEditing ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            maxLength={100}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter post title..."
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            maxLength={1000}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter post content..."
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
            maxLength={50}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter author name..."
          />
        </div>

        <div className="flex gap-4 pt-4">
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
        </div>
      </form>
    </div>
  )
}

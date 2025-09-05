import { Link } from 'react-router-dom'

import { ROUTES } from '@app/router/routes.constants'
import { useDeletePostMutation } from '@entities/post/api/postsApi'

export const PostCard = ({ post }) => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post._id).unwrap()
      } catch (error) {
        // Error handling is managed by RTK Query
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
        <div className="flex gap-2">
          <Link
            to={`${ROUTES.EDIT_POST}/${post._id}`}
            className="px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{post.content}</p>

      <div className="text-sm text-gray-500 space-y-1">
        <div>Author: {post.author}</div>
        <div>Created: {new Date(post.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

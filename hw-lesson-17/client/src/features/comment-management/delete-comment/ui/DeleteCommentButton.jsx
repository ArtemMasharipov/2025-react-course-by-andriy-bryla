import { useDeleteCommentMutation } from '@/entities/post/comments/api/commentApi'
import { useState } from 'react'

export function DeleteCommentButton({ comment, onDeleting }) {
  const [deleteComment] = useDeleteCommentMutation()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    onDeleting?.(true)
    try {
      await deleteComment(comment.id).unwrap()
    } catch (e) {
      setIsDeleting(false)
      onDeleting?.(false)
    }
  }


  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center p-1 text-gray-400 hover:text-red-600 focus:outline-none focus:text-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Видалити коментар"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}

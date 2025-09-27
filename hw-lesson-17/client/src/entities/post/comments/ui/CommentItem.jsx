import { DeleteCommentButton } from '@/features/comment-management'
import { useState } from 'react'

export function CommentItem({ comment }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const containerClasses = `bg-gray-50 rounded-lg p-3 transition-opacity duration-200 ${isDeleting ? 'opacity-50' : ''}`

  return (
    <div className={containerClasses}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600">
                {comment.authorName?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">{comment.authorName}</span>
            {isDeleting && (
              <span className="text-xs text-gray-500">Видаляється...</span>
            )}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
        </div>
        <div className="ml-3 flex-shrink-0">
          <DeleteCommentButton comment={comment} onDeleting={setIsDeleting} />
        </div>
      </div>
    </div>
  )
}

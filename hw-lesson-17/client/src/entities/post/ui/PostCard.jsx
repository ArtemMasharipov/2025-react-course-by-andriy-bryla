import { useState } from 'react'

import { selectAuthUser } from '@/features/auth'
import { useSelector } from 'react-redux'

import { CommentForm } from '@/features/comment-management'
import { CommentList } from '@/widgets/commentList'

export function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false)
  const user = useSelector(selectAuthUser)

  const toggleCommentsText = showComments ? 'Сховати коментарі' : 'Показати коментарі'
  const chevronClasses = `w-4 h-4 mr-1 transition-transform duration-200 ${showComments ? 'rotate-180' : ''}`

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-gray-600">
                  {post.author?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <span>Автор: {post.author?.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowComments((v) => !v)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            <svg className={chevronClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {toggleCommentsText}
          </button>
        </div>

        {showComments && (
          <div className="mt-4 space-y-4">
            <CommentList postId={post.id} />
            {user && <CommentForm postId={post.id} />}
          </div>
        )}
      </div>
    </article>
  )
}

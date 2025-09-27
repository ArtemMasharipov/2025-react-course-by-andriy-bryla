import { useCreateCommentMutation } from '@/entities/post/comments/api/commentApi'
import { useState } from 'react'

export function CommentForm({ postId }) {
  const [content, setContent] = useState('')
  const [createComment, { isLoading }] = useCreateCommentMutation()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    await createComment({ postId, text: content })
    setContent('')
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Напишіть коментар..."
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>
      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={isLoading || !content.trim()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Додаю...
            </>
          ) : (
            'Додати коментар'
          )}
        </button>
      </div>
    </form>
  )
}

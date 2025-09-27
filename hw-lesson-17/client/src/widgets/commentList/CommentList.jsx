import { CommentItem } from '@/entities/post/comments'
import { useGetCommentsByPostQuery } from '@/entities/post/comments/api/commentApi'
import { ErrorDisplay } from '@/shared/ui'

export function CommentList({ postId }) {
  const { data, isLoading, error } = useGetCommentsByPostQuery({
    postId,
  })

  if (isLoading) return (
    <div className="flex items-center justify-center py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <span className="ml-2 text-sm text-gray-600">Завантаження коментарів...</span>
    </div>
  )
  
  if (error) return <ErrorDisplay error={error} message="Помилка завантаження коментарів" />

  const comments = data || []

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-900 flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Коментарі ({comments.length})
      </h4>
      {comments.length === 0 ? (
        <div className="text-center py-4 text-gray-500 text-sm">
          Поки що немає коментарів
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>
      )}
    </div>
  )
}

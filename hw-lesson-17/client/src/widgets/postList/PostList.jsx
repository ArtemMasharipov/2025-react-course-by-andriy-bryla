import { useState } from 'react'

import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostCard } from '@/entities/post/ui/PostCard'

import { ErrorDisplay, Pagination } from '@/shared/ui'

export function PostList() {
  const [page, setPage] = useState(1)
  const limit = 10
  const { data, isLoading, error } = useGetPostsQuery({ page, limit })

  if (isLoading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Завантаження оголошень...</p>
      </div>
    </div>
  )
  
  if (error) return <ErrorDisplay error={error} message="Помилка завантаження оголошень" />

  const posts = data.items || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">Оголошення не знайдені</div>
        </div>
      )}

      <Pagination 
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}

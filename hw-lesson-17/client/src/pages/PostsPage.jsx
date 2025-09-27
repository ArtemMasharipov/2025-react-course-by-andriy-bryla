import { PostList } from '@/widgets/postList/PostList'

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Оголошення</h1>
      </div>
      <PostList />
    </div>
  )
}

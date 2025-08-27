import PostsList from '../entities/post/ui/PostsList'
import Breadcrumb from '../widgets/Breadcrumb'

const PostsPage = () => {
  return (
    <div className="space-y-8">
      <Breadcrumb />
      <div className="page-header">
        <div>
          <h1 className="heading-hero">Posts from JSONPlaceholder</h1>
          <p className="mt-2 max-w-prose text-sm text-slate-600">Browse posts from the public JSONPlaceholder API.</p>
        </div>
      </div>
      <PostsList />
    </div>
  )
}

export default PostsPage

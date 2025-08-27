import { useDispatch, useSelector } from 'react-redux'
import { REQUEST_STATUS } from '../../../shared/config/api'
import { selectPosts, selectPostsError, selectPostsStatus } from '../model/selectors'
import { fetchPostsThunk } from '../model/thunks'
import PostItem from './PostItem'

const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  const status = useSelector(selectPostsStatus)
  const error = useSelector(selectPostsError)

  const handleLoadPosts = () => {
  dispatch(fetchPostsThunk())
  }

  if (status === REQUEST_STATUS.LOADING) {
    return <div className="flex flex-col items-center gap-3 py-10"><div className="spinner" /><p className="text-sm text-slate-500">Loading posts...</p></div>
  }
  if (status === REQUEST_STATUS.FAILED) {
    return <div className="flex flex-col items-center gap-4 py-10"><p className="text-sm text-red-600">Error loading posts: {error}</p><button onClick={handleLoadPosts} className="btn">Try Again</button></div>
  }
  if (status === REQUEST_STATUS.IDLE || posts.length === 0) {
    return <div className="flex flex-col items-center gap-4 py-10"><p className="text-sm text-slate-500">No posts loaded yet.</p><button onClick={handleLoadPosts} className="btn">Load Posts</button></div>
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Posts <span className="badge ml-1">{posts.length}</span></h3>
        <button onClick={handleLoadPosts} className="btn btn-secondary">Reload Posts</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostsList

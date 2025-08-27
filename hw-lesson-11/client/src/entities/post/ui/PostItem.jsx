/* PostItem: Presentational component for a single post */
const PostItem = ({ post }) => {
  return (
    <div className="card p-4 flex flex-col gap-2" data-id={post.id}>
      <h4 className="font-medium text-slate-800 line-clamp-2">{post.title}</h4>
      <p className="text-sm text-slate-600 line-clamp-3">{post.body}</p>
      <span className="self-start text-[10px] uppercase tracking-wide text-slate-400">Post #{post.id}</span>
    </div>
  )
}

export default PostItem

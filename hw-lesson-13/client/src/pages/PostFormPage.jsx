import { useParams } from 'react-router-dom'

import { PostForm } from '@/entities/post'

export const PostFormPage = () => {
  const { id } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <PostForm postId={id} />
    </div>
  )
}

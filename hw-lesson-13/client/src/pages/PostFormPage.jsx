import { ROUTES } from '@app/router/routes.constants'
import { PostFormFeature } from '@features'
import { useNavigate, useParams } from 'react-router-dom'

export const PostFormPage = () => {
  const navigate = useNavigate()
  const { id: postId } = useParams()

  const handleSuccess = () => {
    navigate(ROUTES.POSTS)
  }

  const handleCancel = () => {
    navigate(ROUTES.POSTS)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PostFormFeature
        postId={postId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  )
}

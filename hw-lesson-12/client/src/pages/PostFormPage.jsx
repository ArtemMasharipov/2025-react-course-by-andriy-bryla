import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { PostForm, selectPostById } from '@/entities/post'
import { fetchPostByIdThunk } from '@/entities/post/model/thunks'

export const PostFormPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const post = useSelector(state => id ? selectPostById(state, id) : null)

  useEffect(() => {
    if (id && !post) {
      dispatch(fetchPostByIdThunk(id))
    }
  }, [dispatch, post, id])

  return (
    <div className="container mx-auto px-4 py-8">
      <PostForm postId={id} initialData={post} />
    </div>
  )
}

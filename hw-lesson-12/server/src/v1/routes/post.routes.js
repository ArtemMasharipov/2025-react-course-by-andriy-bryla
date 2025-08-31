import { Router } from 'express'
import { postController } from '../controllers/post.controller.js'
import { validatePost } from '../validators/post.schema.js'

const router = Router()

router.get('/', postController.getPosts)
router.post('/', validatePost, postController.createPost)
router.get('/:id', postController.getPostById)
router.put('/:id', validatePost, postController.updatePost)
router.delete('/:id', postController.deletePost)

export default router

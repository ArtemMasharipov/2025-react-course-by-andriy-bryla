import express from 'express'
import PostController from '../controllers/postController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', PostController.getPaginatedPosts)

router.get('/all', PostController.getAllPosts)

router.get('/my', requireAuth, PostController.getMyPosts)

router.get('/author/:authorId', PostController.getPostsByAuthor)

router.get('/:id', PostController.getPostById)

router.post('/', requireAuth, PostController.createPost)

router.put('/:id', requireAuth, PostController.updatePost)

router.delete('/:id', requireAuth, PostController.deletePost)

export default router

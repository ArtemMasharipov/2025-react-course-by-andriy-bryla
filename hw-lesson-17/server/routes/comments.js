import express from 'express'
import CommentController from '../controllers/commentController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', CommentController.getComments)

router.get('/my', requireAuth, CommentController.getMyComments)

router.get('/author/:authorId', CommentController.getCommentsByAuthor)

router.get('/count/:postId', CommentController.getCommentCount)

router.get('/:id', CommentController.getCommentById)

router.post('/', requireAuth, CommentController.createComment)

router.put('/:id', requireAuth, CommentController.updateComment)

router.delete('/:id', requireAuth, CommentController.deleteComment)

export default router

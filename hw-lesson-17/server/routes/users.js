import express from 'express'
import UserController from '../controllers/userController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/all', requireAuth, requireRole('admin'), UserController.getAllUsers)

router.get('/', requireAuth, requireRole('admin'), UserController.getPaginatedUsers)

router.get('/profile', requireAuth, UserController.getProfile)
router.put('/profile', requireAuth, UserController.updateProfile)

router.get('/:id', requireAuth, UserController.getUserById)

router.post('/', requireAuth, requireRole('admin'), UserController.createUser)

router.put('/:id', requireAuth, UserController.updateUser)

router.delete('/:id', requireAuth, requireRole('admin'), UserController.deleteUser)

export default router

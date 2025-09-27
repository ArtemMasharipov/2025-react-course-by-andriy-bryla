import express from 'express'
import AuthController from '../controllers/authController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/refresh', AuthController.refresh)
router.post('/logout', AuthController.logout)

router.get('/me', requireAuth, AuthController.me)
router.get('/check', AuthController.checkAuth)

export default router

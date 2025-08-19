import { Router } from 'express'
import meetingRoutes from './meeting.routes.js'
import teacherRoutes from './teacher.routes.js'

const router = Router()

router.use('/teachers', teacherRoutes)
router.use('/meetings', meetingRoutes)

export default router

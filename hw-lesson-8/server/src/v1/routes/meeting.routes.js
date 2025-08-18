import { Router } from 'express'
import * as ctrl from '../controllers/meeting.controller.js'
const router = Router()
router.get('/', ctrl.list)
router.patch('/assign/:teacherId', ctrl.assign)
router.patch('/unassign/:teacherId', ctrl.unassign)
export default router

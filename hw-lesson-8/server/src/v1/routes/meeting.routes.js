import { Router } from 'express'
import { param } from 'express-validator'
import * as ctrl from '../controllers/meeting.controller.js'
import { handleValidationErrors } from '../../../middleware/validation.js'

const oid = (name = 'id') => param(name).isMongoId().withMessage(`${name} must be a valid ObjectId`)

const router = Router()

router.get('/', ctrl.list)

router.patch(
	'/:meetingId/assign/:teacherId',
	oid('meetingId'),
	oid('teacherId'),
	handleValidationErrors,
	ctrl.assign
)

router.patch(
	'/:meetingId/unassign/:teacherId',
	oid('meetingId'),
	oid('teacherId'),
	handleValidationErrors,
	ctrl.unassign
)

// Backward compatibility (legacy routes without meetingId)
router.patch(
	'/assign/:teacherId',
	oid('teacherId'),
	handleValidationErrors,
	ctrl.assign
)
router.patch(
	'/unassign/:teacherId',
	oid('teacherId'),
	handleValidationErrors,
	ctrl.unassign
)

export default router

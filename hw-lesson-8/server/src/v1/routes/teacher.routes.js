import express from 'express'
import { param } from 'express-validator'
import { handleValidationErrors } from '../../../middleware/validation.js'
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
} from '../controllers/teacher.controller.js'
import { teacherSchema } from '../validators/teacher.schema.js'

const router = express.Router()
const idParam = param('id')
  .isMongoId()
  .withMessage('id must be a valid ObjectId')

router.get('/', getAllTeachers)
router.get('/:id', idParam, handleValidationErrors, getTeacherById)
router.post('/', teacherSchema, handleValidationErrors, createTeacher)
router.put(
  '/:id',
  idParam,
  teacherSchema,
  handleValidationErrors,
  updateTeacher
)
router.delete('/:id', idParam, handleValidationErrors, deleteTeacher)

export default router

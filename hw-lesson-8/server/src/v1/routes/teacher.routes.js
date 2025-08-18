import express from 'express'
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
router.get('/', getAllTeachers)
router.get('/:id', getTeacherById)
router.post('/', teacherSchema, handleValidationErrors, createTeacher)
router.put('/:id', teacherSchema, handleValidationErrors, updateTeacher)
router.delete('/:id', deleteTeacher)
export default router

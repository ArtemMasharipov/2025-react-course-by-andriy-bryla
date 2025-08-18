import { unassign as unassignFromMeeting } from '../services/meeting.service.js'
import * as teacherSvc from '../services/teacher.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await teacherSvc.list()
  res.json({ data: teachers, meta: { total: teachers.length } })
})
export const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await teacherSvc.get(req.params.id)
  if (!teacher)
    return res.status(404).json({
      error: { message: 'Викладача не знайдено', code: 'TEACHER_NOT_FOUND' },
    })
  res.json({ data: teacher })
})
export const createTeacher = asyncHandler(async (req, res) => {
  const created = await teacherSvc.create(req.body)
  res.status(201).json({ data: created })
})
export const updateTeacher = asyncHandler(async (req, res) => {
  const updatedTeacher = await teacherSvc.update(req.params.id, req.body)
  if (!updatedTeacher)
    return res.status(404).json({
      error: { message: 'Викладача не знайдено', code: 'TEACHER_NOT_FOUND' },
    })
  res.json({ data: updatedTeacher })
})
export const deleteTeacher = asyncHandler(async (req, res) => {
  await unassignFromMeeting(req.params.id)
  const deleted = await teacherSvc.remove(req.params.id)
  if (!deleted)
    return res.status(404).json({
      error: { message: 'Викладача не знайдено', code: 'TEACHER_NOT_FOUND' },
    })
  res.json({ data: { message: 'Викладача видалено' } })
})

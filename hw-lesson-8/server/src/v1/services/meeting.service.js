import Meeting from '../models/Meeting.js'
import Teacher from '../models/Teacher.js'
import { httpError } from '../utils/httpError.js'
const MEETING_ID = 'singleton'
async function ensureTeacher(id) {
  try {
    const exists = await Teacher.exists({ _id: id })
    if (!exists)
      throw httpError(404, 'Викладача не знайдено', 'TEACHER_NOT_FOUND')
  } catch (e) {
    if (e?.name === 'CastError')
      throw httpError(400, 'Некоректний ідентифікатор викладача', 'BAD_ID')
    throw e
  }
}
async function getOrCreate() {
  let doc = await Meeting.findById(MEETING_ID).lean()
  if (!doc) doc = await Meeting.create({ _id: MEETING_ID, participants: [] })
  return doc
}
export async function assign(teacherId) {
  await ensureTeacher(teacherId)
  const existing = await getOrCreate()
  if (existing.participants.some(p => String(p) === String(teacherId)))
    return existing
  if (existing.participants.length >= 2)
    throw httpError(400, 'Зустріч вже містить 2 учасників', 'MEETING_FULL')
  const res = await Meeting.updateOne(
    {
      _id: MEETING_ID,
      $expr: { $lt: [{ $size: '$participants' }, 2] },
      participants: { $ne: teacherId },
    },
    { $addToSet: { participants: teacherId } }
  )
  if (res.matchedCount === 0 || res.modifiedCount === 0) {
    const fresh = await getOrCreate()
    if (
      fresh.participants.length >= 2 &&
      !fresh.participants.includes(teacherId)
    )
      throw httpError(400, 'Зустріч вже містить 2 учасників', 'MEETING_FULL')
    return fresh
  }
  return await getOrCreate()
}
export async function unassign(teacherId) {
  await ensureTeacher(teacherId)
  await Meeting.updateOne(
    { _id: MEETING_ID },
    { $pull: { participants: teacherId } },
    { upsert: true }
  )
  return await getOrCreate()
}
export async function list() {
  return await getOrCreate()
}

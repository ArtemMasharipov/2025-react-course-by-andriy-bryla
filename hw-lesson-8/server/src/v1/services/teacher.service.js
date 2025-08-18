import Teacher from '../models/Teacher.js'

export async function list() {
  return Teacher.find().sort({ fullName: 1 }).lean()
}

export async function get(id) {
  return Teacher.findById(id).lean()
}

export async function create(data) {
  sanitizePhoto(data)
  return Teacher.create(data)
}

export async function update(id, data) {
  sanitizePhoto(data)
  return Teacher.findByIdAndUpdate(id, data, { new: true, lean: true })
}

export async function remove(id) {
  return Teacher.findByIdAndDelete(id).lean()
}

function sanitizePhoto(data) {
  if (!data) return
  if (data.photoBase64) {
    const val = data.photoBase64
    const len = val.startsWith('data:') ? val.split(',')[1].length : val.length
    const approxBytes = (len * 3) / 4
    if (approxBytes > 1024 * 1024) {
      delete data.photoBase64
    }
  }
}

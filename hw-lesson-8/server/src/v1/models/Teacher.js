import mongoose from 'mongoose'
const teacherSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    photoBase64: { type: String, default: '' },
  },
  { timestamps: true, versionKey: false }
)
export default mongoose.model('Teacher', teacherSchema)

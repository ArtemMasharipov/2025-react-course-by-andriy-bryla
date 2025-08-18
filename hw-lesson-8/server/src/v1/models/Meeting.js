import mongoose from 'mongoose'
const { Schema, model } = mongoose
const MeetingSchema = new Schema(
  {
    _id: { type: String, default: 'singleton' },
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
      validate: [
        arr => Array.isArray(arr) && arr.length <= 2,
        'Максимум 2 викладача',
      ],
      index: true,
      default: [],
    },
  },
  { timestamps: true, versionKey: false, _id: false }
)
export default model('Meeting', MeetingSchema)

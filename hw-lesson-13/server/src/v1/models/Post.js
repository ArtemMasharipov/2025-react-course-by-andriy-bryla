import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      minlength: [1, 'Post title must be at least 1 character'],
      maxlength: [100, 'Post title cannot exceed 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
      minlength: [1, 'Post content must be at least 1 character'],
      maxlength: [1000, 'Post content cannot exceed 1000 characters'],
    },
    author: {
      type: String,
      required: [true, 'Post author is required'],
      trim: true,
      minlength: [1, 'Author name must be at least 1 character'],
      maxlength: [50, 'Author name cannot exceed 50 characters'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Post', postSchema)

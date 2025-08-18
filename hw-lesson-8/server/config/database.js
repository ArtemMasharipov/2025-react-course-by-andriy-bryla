import mongoose from 'mongoose'
import config from './default.mjs'

export default async function connectDB() {
  try {
    await mongoose.connect(config.mongoURI)
    console.log(`✅ Connected to MongoDB`)
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  }
}

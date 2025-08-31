import cors from 'cors'
import express from 'express'
import connectDB from '../config/database.js'
import config from '../config/default.mjs'
import { errorHandler } from '../middleware/errorHandler.js'
import postRoutes from './v1/routes/post.routes.js'

await connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/posts', postRoutes)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`)
})

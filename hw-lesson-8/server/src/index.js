import cors from 'cors'
import express from 'express'
import connectDB from '../config/database.js'
import config from '../config/default.mjs'
import { errorHandler, notFound } from '../middleware/errorHandler.js'
import meetingRoutes from './v1/routes/meeting.routes.js'
import teacherRoutes from './v1/routes/teacher.routes.js'
await connectDB()
const app = express()
app.use(cors({ origin: config.clientUrl, credentials: true }))
app.use(express.json())
app.use('/api/v1/teachers', teacherRoutes)
app.use('/api/v1/meetings', meetingRoutes)
app.use('*', notFound)
app.use(errorHandler)
app.listen(config.port, () => {
  console.log(`🚀 Server running at http://localhost:${config.port}`)
})

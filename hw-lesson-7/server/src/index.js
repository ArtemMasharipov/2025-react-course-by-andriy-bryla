import cors from 'cors'
import express from 'express'
import connectDB from '../config/database.js'
import config from '../config/default.mjs'
import { errorHandler, notFound } from '../middleware/errorHandler.js'
import v1Routes from './v1/routes/index.js'

connectDB()

const app = express()

// Middleware
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
)
app.use(express.json())

// API Routes
app.use('/api/v1', v1Routes)

app.use('*', notFound)
app.use(errorHandler)

// Start server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
})

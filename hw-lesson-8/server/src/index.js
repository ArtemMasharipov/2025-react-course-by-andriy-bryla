import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import connectDB from '../config/database.js'
import config from '../config/default.mjs'
import { errorHandler, notFound } from '../middleware/errorHandler.js'
import v1Routes from './v1/routes/index.js'

await connectDB()

const app = express()

app.set('trust proxy', true)

const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean)
app.use(
  cors({
    origin: (origin, cb) =>
      !origin || allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error('CORS')),
    credentials: true,
  })
)

app.use(helmet())
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('tiny'))

app.get('/health', (req, res) => res.json({ ok: true }))

app.use('/api/v1', v1Routes)

app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`🚀 Server running at http://localhost:${config.port}`)
})

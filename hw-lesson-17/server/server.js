import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { delay } from './middleware/delay.js'

import authRoutes from './routes/auth.js'
import commentRoutes from './routes/comments.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173', 
      'http://localhost:5174',
      process.env.FRONTEND_URL || 'https://your-app.vercel.app'
    ],
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(delay)

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))

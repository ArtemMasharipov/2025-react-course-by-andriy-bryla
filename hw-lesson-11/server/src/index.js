import cors from 'cors'
import express from 'express'
import connectDB from '../config/database.js'
import config from '../config/default.mjs'
import { errorHandler, notFound } from '../middleware/errorHandler.js'
import productRoutes from './v1/routes/product.routes.js'

await connectDB()

const app = express()

app.use(cors({ origin: config.clientUrl, credentials: true }))
app.use(express.json())

// API routes
app.use('/api/v1/products', productRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(config.port, () => {
  console.log(`🚀 Server running at http://localhost:${config.port}`)
})

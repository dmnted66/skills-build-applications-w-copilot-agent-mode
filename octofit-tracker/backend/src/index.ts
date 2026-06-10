import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDatabase } from './db/connection.js'
import { authMiddleware, errorHandler } from './middleware/index.js'
import { activityRouter } from './routes/activities.js'
import { goalRouter } from './routes/goals.js'
import { statsRouter } from './routes/stats.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json())
app.use(authMiddleware)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: 'MongoDB with Mongoose',
    port: PORT
  })
})

// API Routes
app.use('/api/activities', activityRouter)
app.use('/api/goals', goalRouter)
app.use('/api/stats', statsRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found'
  })
})

// Error handler
app.use(errorHandler)

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDatabase()

    app.listen(PORT, () => {
      console.log(`🐙 OctoFit Tracker Backend`)
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`)
      console.log(`🗄️  Database: MongoDB (mongodb://localhost:27017/octofit-tracker)`)
      console.log(`🌐 Frontend: http://localhost:5173`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

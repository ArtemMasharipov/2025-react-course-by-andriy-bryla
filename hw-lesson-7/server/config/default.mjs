import dotenv from 'dotenv'
dotenv.config()

export default Object.freeze({
  databaseName: process.env.DATABASE_NAME || 'hw-lesson-7',
  databaseUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/',
  mongoURI: `${process.env.MONGODB_URL || 'mongodb://localhost:27017/'}${
    process.env.DATABASE_NAME || 'hw-lesson-7'
  }`,
  port: process.env.PORT || 3001,
  secretKey: process.env.SECRET_KEY || 'your-secret-key',
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
})

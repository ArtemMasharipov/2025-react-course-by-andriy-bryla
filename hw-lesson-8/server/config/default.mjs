import dotenv from 'dotenv'
dotenv.config()

const { PORT, MONGODB_URL, DATABASE_NAME, SECRET_KEY, NODE_ENV, CLIENT_URL } =
  process.env

export default Object.freeze({
  port: PORT || 3001,
  mongoURI: `${MONGODB_URL || 'mongodb://localhost:27017/'}${
    DATABASE_NAME || 'school-db'
  }`,
  secretKey: SECRET_KEY || 'super-secret-key',
  nodeEnv: NODE_ENV || 'development',
  clientUrl: CLIENT_URL || 'http://localhost:5173',
})

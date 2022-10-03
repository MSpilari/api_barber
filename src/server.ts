import 'express-async-errors'
import dotenv from 'dotenv'
import express from 'express'
import { cloudinaryConfigs } from './configs/cloudinary'
import { router } from './router'
import { errorHandler } from './middlewares/errorHandler'
import cors from 'cors'
import './configs/multer'

const PORT = process.env.PORT || 3001

const server = express()

dotenv.config()

cloudinaryConfigs()

server.use(cors())

server.use(express.json())

server.use(router)

server.use(errorHandler)

server.listen(PORT, () => console.log(`Server is running on port ${PORT} ...`))

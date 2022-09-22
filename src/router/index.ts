import { Router } from 'express'
import { multerUploads } from '../configs/multer'
import { AddBarber } from '../controllers/AddBarber'

const router = Router()

router.post('/barber', multerUploads.single('barberImage'), AddBarber)

export { router }

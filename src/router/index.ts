import { Router } from 'express'
import { multerUploads } from '../configs/multer'
import { AddBarber } from '../controllers/AddBarber'
import { Login } from '../controllers/Login'

const router = Router()

router.post('/barber', multerUploads.single('barberImage'), AddBarber)
router.post('/login', Login)

export { router }

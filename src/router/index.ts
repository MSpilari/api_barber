import { Router } from 'express'
import { multerUploads } from '../configs/multer'
import { AddBarber } from '../controllers/AddBarber'
import { DeleteBarber } from '../controllers/DeleteBarber'
import { Login } from '../controllers/Login'
import { authToken } from '../middlewares/authToken'

const router = Router()

router.post('/barber', multerUploads.single('barberImage'), AddBarber)
router.post('/login', Login)

router.delete('/barber', authToken, DeleteBarber)

export { router }

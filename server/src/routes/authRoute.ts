import { login, register } from '../controllers/auth-controller'
import express, { Router } from 'express'

const router: Router = express.Router()

router.post('/login', login)
router.post('/register', register)

export default router
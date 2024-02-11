import express, { Router } from 'express';
import { getUserData, logout, givePermission } from '../controllers/user-controller';
import verifyJWT from '../middlewares/verifyJWT';

const router: Router = express.Router()

router.post('/', verifyJWT, getUserData)
router.post('/logout', verifyJWT, logout)
router.post('/permission', verifyJWT, givePermission)

export default router;
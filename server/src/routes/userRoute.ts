import express, { Router } from 'express';
import { getUserData, logout, givePermission, forgotPassword, resetPassword, updateEmail, updateNickname, updatePassword, updatePhone } from '../controllers/user-controller';
import verifyJWT from '../middlewares/verifyJWT';
import verifyResetCode from '../middlewares/verifyResetCode';

const router: Router = express.Router()

router.post('/', verifyJWT, getUserData)
router.post('/logout', verifyJWT, logout)
router.post('/permission', verifyJWT, givePermission)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', verifyResetCode, resetPassword)
router.post('/update-email', verifyJWT, updateEmail)
router.post('/update-nickname', verifyJWT, updateNickname)
router.post('/update-password', verifyJWT, updatePassword)
router.post('/update-phone', verifyJWT, updatePhone)

export default router;
import { Router } from "express";
import {SignUp,Logout,VerifyOTP,Login,verifyResetPasswordOTP,UpdatePassword,ForgotPassword} from '../controllers/auth.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js";
const router =Router()

//auth section
router.post('/SignUp',SignUp)
router.post('/verifyOTP',VerifyOTP)
router.post('/forgotpassword',ForgotPassword)
router.post('/verifyresetOTP',verifyResetPasswordOTP)
router.post('/login',Login)
router.post('/logout',verifyJWT,Logout)
router.post('/updatePassword',verifyJWT,UpdatePassword)



export default router
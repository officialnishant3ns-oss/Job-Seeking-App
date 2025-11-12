import { Router } from "express";
import {SignUp,Logout,VerifyOTP,Login,verifyResetPasswordOTP,createnewpassword,UpdatePassword,ForgotPassword} from '../controllers/auth.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js";
const router =Router()

//auth section
router.post('/SignUp',SignUp)
router.post('/verifyOTP',VerifyOTP)
router.post('/login',Login)
router.post('/forgotpassword',ForgotPassword)
router.post('/verifyresetOTP',verifyResetPasswordOTP)
router.post('/newpassword',createnewpassword)
router.post('/logout',verifyJWT,Logout)
router.post('/updatePassword',verifyJWT,UpdatePassword)



export default router
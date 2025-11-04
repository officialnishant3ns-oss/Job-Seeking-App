import { Router } from "express";
import {SignUp,SignIn,VerifyOTP,SignOut,ResendOtp,UpdatePassword,ForgotPassword} from '../controllers/auth.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js";
const router =Router()

router.post('/SignUp',SignUp)
router.post('/verifyOTP',VerifyOTP)
router.post('/resendOTP',ResendOtp)
router.post('/forgotpassword',ForgotPassword)
router.post('/SignIn',SignIn)
router.post('/SignOut',verifyJWT,SignOut)
router.post('/updatePassword',verifyJWT,UpdatePassword)


export default router
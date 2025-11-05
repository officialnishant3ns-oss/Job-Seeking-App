import { Router } from "express";
import {SignUp,SignIn,VerifyOTP,SignOut,verifyResetPasswordOTP,UpdatePassword,ForgotPassword} from '../controllers/auth.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js";
const router =Router()

//auth section
router.post('/SignUp',SignUp)
router.post('/verifyOTP',VerifyOTP)
router.post('/forgotpassword',ForgotPassword)
router.post('/verifyresetOTP',verifyResetPasswordOTP)
router.post('/SignIn',SignIn)
router.post('/SignOut',verifyJWT,SignOut)
router.post('/updatePassword',verifyJWT,UpdatePassword)


//profile management section


export default router
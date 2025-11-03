import { Router } from "express";
import {SignUp,SignIn,VerifyOTP,Logout} from '../controllers/auth.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js";
const router =Router()

router.post('/SignUp',SignUp)
router.post('/verifyOTP',VerifyOTP)
router.post('/SignIn',SignIn)
router.post('/logout',verifyJWT,Logout)

export default router
import { Router } from "express";
import {SingUp} from '../controllers/auth.controller.js'
const router =Router()

router.post('/SingUp',SingUp)


export default router
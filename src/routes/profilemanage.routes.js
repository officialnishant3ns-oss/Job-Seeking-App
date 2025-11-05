import { Router } from "express";
import {SeekerProfile} from '../controllers/profileManagement.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js";
const router = Router()


//profile management section
router.post("/profilemanage",verifyJWT,SeekerProfile)

export default router;


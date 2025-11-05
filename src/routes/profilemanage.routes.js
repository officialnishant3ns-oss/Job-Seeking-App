import { Router } from "express";
import { SeekerProfile,uploadResume } from '../controllers/profileManagement.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js";
const router = Router()


//profile management section
router.post("/profilemanage",verifyJWT, SeekerProfile)
router.post('/uploadresume',upload.fields([
        { name: "resume", maxCount: 1 }
    ]),
    uploadResume
)


export default router;


import { Router } from "express";
import { SeekerProfile,uploadResume,getMySeekerProfile } from '../controllers/jobSeeker.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js";

const router = Router()

//profile management for jobseeker 
router.post("/profilemanage",verifyJWT, SeekerProfile)
router.post('/uploadresume',verifyJWT,upload.fields([
        { name: "resume", maxCount: 1 }
    ]),
    uploadResume
)
router.get('/profile',verifyJWT,getMySeekerProfile)   



export default router;


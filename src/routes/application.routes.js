import { Router } from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js"
import { ApplyforJob,myallapplication,updatestatus } from '../controllers/Application.controller.js'
const router = Router()

//apply for job >>>jobseeker
router.post( "/applyjob/:jobId", verifyJWT,upload.fields([{ name: "resume", maxCount: 1 }]),  ApplyforJob)
router.get('/getapplication',verifyJWT,myallapplication)
router.patch('/updatestatus',verifyJWT,updatestatus)
export default router;


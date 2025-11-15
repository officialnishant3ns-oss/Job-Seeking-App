import { Router } from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js"
import { ApplyforJob,myallapplication,updatestatus ,getApplicationbyJobgiver} from '../controllers/Application.controller.js'
const router = Router()

//apply for job >>>jobseeker
router.post( "/applyjob/:jobId", verifyJWT,upload.fields([{ name: "resume", maxCount: 1 }]),  ApplyforJob)
router.get('/getapplication',verifyJWT,myallapplication)


//for jobgiver
router.get('/getallapplicant/:jobId',verifyJWT,getApplicationbyJobgiver)
router.put('/updatestatus',verifyJWT,updatestatus)
export default router


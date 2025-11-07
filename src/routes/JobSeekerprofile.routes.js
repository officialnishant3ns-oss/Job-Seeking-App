import { Router } from "express";
import { SeekerProfile,uploadResume,getMySeekerProfile } from '../controllers/jobSeeker.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js";
import { getjobs, getAllJobs} from '../controllers/Job.controller.js'
import { ApplyforJob } from '../controllers/Application.controllers.js'
const router = Router()


//profile management section for jobseeker there
router.post("/profilemanage",verifyJWT, SeekerProfile)
router.post('/uploadresume',verifyJWT,upload.fields([
        { name: "resume", maxCount: 1 }
    ]),
    uploadResume
)
router.get('/profile',getMySeekerProfile)   // by id checking that should be done there

//routes for jobseeker
router.get('/getjob/:jobId', getjobs)  
router.get('/getalljob', getAllJobs)


//apply for job
router.post(
    "/applyjob/:jobId",
    verifyJWT,
    upload.fields([{ name: "resume", maxCount: 1 }]),
    ApplyforJob
)

export default router;


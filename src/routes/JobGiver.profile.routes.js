import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js";
import { JobGiverProfile, uploadLogo, getMyCompanyProfile } from '../controllers/jobGiver.controller.js'
import { CreateJob, updateJob, DeleteJobs } from '../controllers/Job.controller.js'
const router = Router()


//profile management section for jobgiver 
router.post("/profilemanage", verifyJWT, JobGiverProfile)
router.post('/uploadlogo', verifyJWT, upload.fields([
    { name: "logo", maxCount: 1 }
]),
    uploadLogo
)
router.get('/profile/',verifyJWT, getMyCompanyProfile)

//routes for jobs
router.post('/createjob', verifyJWT, CreateJob)
router.put('/updatejob/:jobId', verifyJWT, updateJob)
router.delete('/deletejob/:jobId', verifyJWT, DeleteJobs)


export default router;

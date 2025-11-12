import { Router } from "express";
import { CreateJob, updateJob, DeleteJobs,getjobsbyId, getAllJobs } from '../controllers/Job.controller.js'

import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js"


const router = Router()

// JobsGivers
router.post('/createjob', verifyJWT, CreateJob)
router.put('/updatejob/:jobId', verifyJWT, updateJob)
router.delete('/deletejob/:jobId', verifyJWT, DeleteJobs)

// Jobseeker
router.get('/getjob/:jobId', getjobsbyId)  
router.get('/getalljob',verifyJWT, getAllJobs)


export default router;


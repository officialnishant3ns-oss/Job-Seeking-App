import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"
import { savedjob } from "../controllers/savedjobs.controller.js"
const router =Router()


//for job seeker
router.post('/savejob/:jobId',verifyJWT,savedjob)



export default router
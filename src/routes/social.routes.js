import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"
import { savedjob,getSavedJob ,unsaveJob} from "../controllers/savedjobs.controller.js"
import {followUser} from '../controllers/follow.controller.js'
const router =Router()


//for job seeker
router.post('/savejob/:jobId',verifyJWT,savedjob)
router.post('/unsavejob/:jobId',verifyJWT,unsaveJob)
router.get('/getsavedjobs',verifyJWT,getSavedJob)


//following vala portion
router.post('/follow/:userId',verifyJWT,followUser)


//

export default router
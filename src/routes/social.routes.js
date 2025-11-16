import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js";
import { savedjob, getSavedJob, unsaveJob } from "../controllers/savedjobs.controller.js"
import { followUser } from '../controllers/follow.controller.js'
import { createPost ,getFeed} from '../controllers/post.controller.js'
const router = Router()


//for job seeker
router.post('/savejob/:jobId', verifyJWT, savedjob)
router.post('/unsavejob/:jobId', verifyJWT, unsaveJob)
router.get('/getsavedjobs', verifyJWT, getSavedJob)


//following vala portion
router.post('/follow/:userId', verifyJWT, followUser)
//>>unfollow vala portion """TODO"

//feed like linkden vala portion >>> get feed ka routes """TODO"


///post vala portion 
router.post('/makepost', verifyJWT, upload.fields([
    { name: "mediaUrl", maxCount: 2 }
]), createPost)
router.get('/getfeed',verifyJWT,getFeed)
export default router
import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js";
import { savedjob, getSavedJob, unsaveJob } from "../controllers/savedjobs.controller.js"
import { followUser,unfollow } from '../controllers/follow.controller.js'
import { createPost, getFeed, likepost, commentonpost } from '../controllers/post.controller.js'
import { commentFilter } from '../middlewares/filtercomment.middleware.js'
const router = Router()


//for job seeker
router.post('/savejob/:jobId', verifyJWT, savedjob)
router.post('/unsavejob/:jobId', verifyJWT, unsaveJob)
router.get('/getsavedjobs', verifyJWT, getSavedJob)


//following vala portion
router.post('/follow/:userId', verifyJWT, followUser)
router.post('/unfollow/:userId', verifyJWT, unfollow)


//feed like linkden vala portion >>> get feed ka routes """TODO"
router.get('/getfeed', verifyJWT, getFeed)

///post vala portion 
router.post('/makepost', verifyJWT, upload.fields([
    { name: "mediaUrl", maxCount: 2 }
]), createPost)
// router.get('/getfeed', verifyJWT, getFeed)
router.post('/likepost/:postId', verifyJWT, likepost)
router.post('/comment/:postId', verifyJWT, commentFilter, commentonpost)

export default router
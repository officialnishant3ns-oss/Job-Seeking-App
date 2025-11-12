import { Router } from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.controller.js"
import { ApplyforJob } from '../controllers/Application.controller.js'
const router = Router()

//apply for job >>>jobseeker
router.post(
    "/applyjob/:jobId",
    verifyJWT,
    upload.fields([{ name: "resume", maxCount: 1 }]),
    ApplyforJob
)


export default router;


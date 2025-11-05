import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"
import {JobGiverProfile} from '../controllers/jobGiver.controller.js'

const router = Router()


//profile management section
router.post("/profilemanage",verifyJWT, JobGiverProfile)


export default router;

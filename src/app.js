import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()


app.use(cors({
    origin: [
        "https://nextstep-gamma.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true
}));

app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import for user
import userrouter from './routes/user.auth.js'
app.use('/api/v1/user', userrouter)

import Seekerprofilerouter from './routes/JobSeekerprofile.routes.js'
app.use('/api/v1/jobseeker', Seekerprofilerouter)

import Giverprofilerouter from './routes/JobGiver.profile.routes.js'
app.use('/api/v1/jobgiver', Giverprofilerouter)


import job from '../src/routes/Job.routes.js'
app.use('/api/v1/job', job)

import application from '../src/routes/application.routes.js'
app.use('/api/v1/application', application)

import Social from '../src/routes/social.routes.js'
app.use('/api/v1/social', Social)
export default app
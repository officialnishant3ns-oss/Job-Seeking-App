import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()


app.use(cors({    
      origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({  
    limit:"16kb"
}))
app.use( express.urlencoded({  
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))  
app.use(cookieParser())


//routes import for user
import userrouter from './routes/user.auth.js'
app.use('/api/v1/user',userrouter)

import  Seekerprofilerouter from './routes/JobSeekerprofile.routes.js'
app.use('/api/v1/jobseeker',Seekerprofilerouter)

import Giverprofilerouter from './routes/JobGiver.profile.routes.js'
app.use('/api/v1/jobgiver',Giverprofilerouter)


export default app
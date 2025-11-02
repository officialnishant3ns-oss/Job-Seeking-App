console.log("started making project")

import app from './app.js'

import connectdb from "../src/db/database.js"
import dotenv from "dotenv"
 dotenv.config({
    path: './.env'
})
connectdb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is ready at ${process.env.PORT}`);
        });
        app.on("error", (error) => {
            console.error("ERROR:", error)
            throw error
        })
    })
    .catch((error) => {
        console.log("Mongo_DB connection failed", error);
    });
    
    app.get('/api/v1',(_,res)=>{
        res.send('Welcome to the Job Seeking App')
    })
    


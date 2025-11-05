import mongoose from "mongoose"
const Jobseekerschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    skills: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    education:[
        {
            degree:String,
            institution:String,
            startYear:Date,
            endYear:Date
        }
    ],
    experience:[
        {
            company:String,
            role:String,
            duration:Number,
            description:String
        }
    ],
    resumeUrl:{
        tyep:String,
        required:true
    },
    

},
    { timestamps: true }
)

const Jobseeker = mongoose.model('Jobseeker', Jobseekerschema)
export default Jobseeker
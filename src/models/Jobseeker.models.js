import mongoose from "mongoose"
const Jobseekerschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Profilephoto:{
        type:String
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
            startDate:Date,
            endDate:Date,
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
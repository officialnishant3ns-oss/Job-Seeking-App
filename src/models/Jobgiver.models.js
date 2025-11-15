import mongoose from "mongoose"    //similary or we can say that is company 
const JobsGiverschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    jobtitle: {
        type: String
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        default: "Not specified"
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String
    }
    ,
    description: {
        type: String,
        default: "No description provided"
    },
    specialization: {
        type: String
    },
    aboutcompany: {
        type: String
    }

},
    { timestamps: true }
)

const JobsGivers = mongoose.model('JobsGiver', JobsGiverschema)
export default JobsGivers
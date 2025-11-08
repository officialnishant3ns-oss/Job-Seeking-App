import mongoose from "mongoose"    //similary or we can say that is company 
const JobsGiverschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String
    }
    ,
    description: {
        type: String,
        default: "No description provided"
    },
    location: {
        type: String,
        default: "Not specified"
    }

},
    { timestamps: true }
)

const JobsGivers = mongoose.model('JobsGiver', JobsGiverschema)
export default JobsGivers
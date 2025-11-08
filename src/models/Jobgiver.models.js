import mongoose from "mongoose"    //similary or we can say that is company 
const JobsGiverschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    companyName: {
        type: String
    },
    Logo: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    }

},
    { timestamps: true }
)

const JobsGivers = mongoose.model('JobsGiver', JobsGiverschema)
export default JobsGivers
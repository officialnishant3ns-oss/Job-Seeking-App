import mongoose from "mongoose"
const applicationschema = new mongoose.Schema({
    JobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true
    },
    JobSeekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resume: {
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: ["Sent", "Application viewed", "Interview", "Rejected", "Hired"],
        default: "Sent"
    }
},
    { timestamps: true }
)

const JobApplication = mongoose.model('JobApplication', applicationschema)
export default JobApplication
import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    jobGiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    JobSeekerId: {
        type: mongoose.Schema.Types.ObjectId,   //question there 
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    salary: {
        type: Number,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required:true
    },
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
        default: "Full-time",
    },
    //not in pdf folder for status of job specifiece
    status: {      
        type: String,
        enum: ["Open", "Closed", "In Review"],
        default: "Open",
    }

},
    {
        timestamps: true
    }
)

const Job = mongoose.model("Job", jobschema)
export default Job
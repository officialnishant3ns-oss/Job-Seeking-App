import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    jobGiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // JobSeekerId: {
    //     type: mongoose.Schema.Types.ObjectId,   //question there 
    //     ref: "User"
    // },
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
        type: String,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    experience: {
        type: String,
        required:true
    },
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
        default: "Full-time",
    }
   
},
    {
        timestamps: true
    }
)

const Job = mongoose.model("Job", jobschema)
export default Job
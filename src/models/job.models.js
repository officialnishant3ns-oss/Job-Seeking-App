import mongoose from "mongoose"

const jobSchema = new mongoose.Schema(
    {
        jobGiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        companyName: {
            type: String,
            required: true,
            trim: true
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

        location: {
            type: String,
            required: true
        },

        category: {
            type: String,
            enum: [
                "Commerce",
                "Telecommunications",
                "Hotels & Tourism",
                "Education",
                "Financial Services",
            ],
            default: "Education"
        },

        salary: {
            min: Number,
            max: Number
        },


        skillsRequired: {
            type: [String],
            required: true
        },

        tags: {
            type: [String],
            default: []
        },

        experienceLevel: {
            type: String,
            enum: ["No-experience", "Fresher", "Intermediate", "Expert"],
            default: "No-experience"
        },

        experience: {
            type: String,
            required: true
        },

        jobType: {
            type: String,
            enum: ["Full-time", "Part-time", "Freelance", "Seasonal", "Fixed-Price"],
            default: "Full-time"
        },

    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema)
export default Job

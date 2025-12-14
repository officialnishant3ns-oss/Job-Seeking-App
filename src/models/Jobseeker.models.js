import mongoose from "mongoose"

const JobSeekerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        phonenumber: {
            type: Number,
            required: true
        },
        chooselanguage: {
            type: String,
            enum: ["Hindi", "English", "Urdu"],
            default: "Hindi"
        },
        bio: String,
        resume: String,
        education: [
            {
                degree: String,
                institution: String,
                year: Number
            }
        ],
        skills: {
            type: [String],
            required: true
        },
        experience: [
            {
                company: String,
                role: String,
                duration: Number,
                description: String
            }
        ]
    },
    { timestamps: true }
)

const JobSeeker = mongoose.model("JobSeeker", JobSeekerSchema)
export default JobSeeker

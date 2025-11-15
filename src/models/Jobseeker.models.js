import mongoose from "mongoose"
const Jobseekerschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },
    chooselanguage: {
        type: String,
        enum: ["Hindi", "English", "Urdu"],
        default: "Hindi"
    },
    bio: {
        type: String
    },
    resume: {
        type: String
    },
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

const Jobseeker = mongoose.model('Jobseeker', Jobseekerschema)
export default Jobseeker
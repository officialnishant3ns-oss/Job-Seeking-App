import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const userschema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Jobseeker", 'JobsGiver'],
        default: "Jobseeker"
    },
    refresstoken: {
        type: String
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: String
    },
    savedjob: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ]
    ,
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

},

    { timestamps: true }
)
userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userschema.methods.isPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userschema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userschema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}


const User = mongoose.model('User', userschema)
export default User


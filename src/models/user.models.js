import mongoose from "mongoose"
const userschema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String 
    }

},
    { timestamps: true }
)

const User = mongoose.model('User', userschema)
export default User
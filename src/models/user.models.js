import mongoose from "mongoose"
import bcrypt from 'bcrypt'
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
    isVerified: {
        type: Boolean,
        default: false
    },
    role:{
        type:String,
        enum:["Jobseeker",'JobsGiver'],
        default: "Jobseeker"
    },
    otp: {
        type: String
    }

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


const User = mongoose.model('User', userschema)
export default User
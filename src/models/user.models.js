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
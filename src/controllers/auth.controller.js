import User from '../models/user.models.js'
import { sendOTP } from '../middlewares/mail.middleware.js'

const SignUp = async (req, res) => {
    try {

        const { fullname, email, password } = req.body
        if (!fullname || !email || !password) {
            return res.status(200).json({ message: "Something is Missing" })
        }

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "User already exists go to login" })
        }

        const otp =  Math.floor(100000 + Math.random() * 900000)

        const user = await User.create({
            fullname,
            email,
            password,
            otp,
            isVerified: false
        })
        console.log(" New user created:", user.email);
        const Sendingotp = await sendOTP(user.email, otp)
       
        const createdUser = await User.findById(user._id).select("-otp -password")
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong creating the user" })
        }

        return res.status(200).json({ success: true, message: "User registered successfully", user: createdUser })


    } catch (error) {
          console.error(" Signup Error:", error);
        return res.status(500).json({ message: "Something went wrong while registering" })
    }
}

export { SignUp }
import User from '../models/user.models'
import { sendOTP } from '../middlewares/mail.middleware'

const SingIn = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        if (!fullname || !email || !password) {
            return res.status(200).json({ message: "Something is Missing" })
        }

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "User already exists go to login" })
        }


       
       const otp = Math.floor(100000 + Math.random() * 900000);
  
       const user = await User.create({
           fullname,
           email,
           password,
           otp:otp,
           isVerified: false,
        })
        console.log(user)

        const Sendingotp = sendOTP(user.email,otp)
        if(!Sendingotp){
            return res.status(400).json({message:"Otp not sent on Email"})
        }

        const createdUser = await User.findById(user._id).select("-password ")
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong creating the user" })
        }

        return res.status(200).json({ success: true, message: "User registered successfully", user: createdUser })


    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while registering" })
    }
}
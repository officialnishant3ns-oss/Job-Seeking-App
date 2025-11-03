import User from '../models/user.models.js'
import { sendOTP } from '../middlewares/mail.middleware.js'


const accessandrefreshtokengenerate = async (userId) => {
    try {
        const user = await User.findById(userId)
        const refreshtoken = await user.generateRefreshToken()
        const accesstoken = await user.generateAccessToken()

        user.refreshtoken = refreshtoken
        await user.save({ validateBeforeSave: true })
        return { accesstoken, refreshtoken }
    } catch (error) {
        console.error(" SignIn  Error:", error);
        return res.status(500).json({ message: "Something went wrong while generating token" })
    }
}


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

        const otp = Math.floor(100000 + Math.random() * 900000)

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

const VerifyOTP = async (req, res) => {
    try {
        const { otp } = req.body
        if (!otp) {
            return res.status(400).json({ success: false, message: "OTP is required" });
        }
        const user = await User.findOne({
            otp: otp
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "invalid otp" })
        }
        user.isVerified = true
        user.otp = undefined
        await user.save()
        return res.status(200).json({ success: true, message: "Otp verified successfully" })

    } catch (error) {
        console.error(" SignIn  Error:", error);
        return res.status(500).json({ message: "Something went wrong while Login" })
    }
}
const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({ message: "Something is Missing" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, please register first" })
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in" })
        }

        const validpassword = await user.isPassword(password)
        if (!validpassword) {
            return res.status(400).json({ message: "Password not valid" })
        }

        const { refreshtoken, accesstoken } = await accessandrefreshtokengenerate(user._id)


        const loggegInUser = await User.findById(user._id).select(
            "-password -refresstoken -otp -isVerified"
        )

        const option = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .cookie("accesstoken", accesstoken, option)
            .cookie("refreshtoken", refreshtoken, option)
            .json({ user: loggegInUser, accesstoken, refreshtoken }, "User logged in successfully")

    } catch (error) {
        console.error(" SignIn  Error:", error);
        return res.status(500).json({ message: "Something went wrong while Login" })
    }
}

const Logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id,
            {
                $set: {
                    refreshtoken: undefined
                }
            }, {
            new: true
        }
        )
        const option = {
            httpOnly: true,
            secure: true
        }
        return res.status(200).clearCookie("accesstoken", option)
            .clearCookie("refreshtoken", option).json(
                { message: "User logged Out" }
            )
    } catch (error) {
        console.error(" SignIn  Error:", error);
        return res.status(500).json({ message: "Something went wrong while logout" })
    }
}



export { SignUp, SignIn, VerifyOTP, Logout }
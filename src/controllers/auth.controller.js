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
        return res.status(500).json({ message: "Something went wrong while generating Token" })
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
            return res.status(400).json({ message: "User already exists go to SignIn" })
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
         await sendOTP(user.email, otp)

        const createdUser = await User.findById(user._id).select("-otp -password")
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong creating the user" })
        }

        return res.status(200).json({ success: true, message: "User SignUp successfully", user: createdUser })


    } catch (error) {
        console.error(" Signup Error:", error);
        return res.status(500).json({ message: "Something went wrong while SignUp" })
    }
}

const VerifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        if (user.otp !== otp.toString()) {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }

        user.isVerified = true
        user.otp = undefined
        await user.save()

        return res.status(200).json({ success: true, message: "OTP verified successfully" })
    } catch (error) {
        console.error("VerifyOTP Error:", error)
        return res.status(500).json({ message: "Something went wrong while verifying OTP" })
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
            return res.status(404).json({ message: "User not found, please SignUp first" })
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before SignIn " })
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
            .json({ user: loggegInUser, accesstoken, refreshtoken }, "User SignIn  successfully")

    } catch (error) {
        console.error(" SignIn  Error:", error);
        return res.status(500).json({ message: "Something went wrong while SignIn" })
    }
}

const SignOut = async (req, res) => {
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
                { message: "User SignOut Successfully" }
            )
    } catch (error) {
        console.error(" SignIn  Error:", error);
        return res.status(500).json({ message: "Something went wrong while SignOut" })
    }
}

const UpdatePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body
        if (!oldpassword || !newpassword) {
            return res.status(200).json({ message: "Something is Missing" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
     const Passwordcheck =  await user.isPassword(oldpassword)
     if (!Passwordcheck) {
         return res.status(400).json({ message: "OldPassword not valid" })
     }
       user.password = newpassword
  await user.save({ validateBeforeSave: false })

  return res.status(200).json({  message: "Password updated successfully"},user={oldpassword,newpassword})

    } catch (error) {
        console.error(" SignIn  Error:", error);
        return res.status(500).json({ message: "Something went wrong while Updating Password" })
    }


}
const ForgotPassword = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(200).json({ message: "Email is Missing" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const otp = Math.floor(100000 + Math.random() * 900000)
    user.otp = otp
    sendOTP(user.email, otp)
    return res.status(200).json({ message: "OTP sent pls verify" })
}

//work on it 
const ResendOtp = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(200).json({ message: "Email is Missing" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const otp = Math.floor(100000 + Math.random() * 900000)
        user.otp = otp
        await user.save()
        sendOTP(user.email, otp)

        return res.status(200).json({ message: "OTP resent successfully" })

    } catch (error) {
        console.error(" SignIn  Error:", error);
        return res.status(500).json({ message: "Something went wrong while Resending OTP" })
    }
}


export { SignUp, SignIn, VerifyOTP, SignOut, UpdatePassword, ResendOtp ,ForgotPassword}
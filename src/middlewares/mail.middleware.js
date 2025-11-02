import transporter from '../middlewares/mail.confiq.js'

export const sendOTP = async (email, otp) => {
    try {
        const response = await transporter.sendMail({
            from: `"NISHANT SINGH" <${process.env.USER_EMAIL}>`,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is: ${otp}`,
            html: `<h2>Your OTP is: <b>${otp}</b></h2>`,
        })
        console.log("Email sent successesfully")
    } catch (error) {
          throw new Error('Failed to send OTP email')
    }
}
import transporter from '../middlewares/mail.confiq.js'

 const sendOTP = async (email, otp) => {
    try {
        const response = await transporter.sendMail({
          
            from: `"NISHANT SINGH" <${process.env.USER_EMAIL}>`,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is: ${otp}`,
            html: `
                <div style="font-family:Arial;line-height:1.5">
                    <h2>Email Verification</h2>
                    <p>Your OTP code is:</p>
                    <h1 style="color:#4CAF50">${otp}</h1>
                    <p>This OTP will expire in 5 minutes.</p>
                </div>
            `,
        })
        console.log("Email sent successesfully",response)
    } catch (error) {
          throw new Error('Failed to send OTP email')
    }
}
// export default sendOTP
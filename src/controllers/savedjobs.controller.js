import User from '../models/user.models.js'


const savedjob = async (req, res) => {
    try {
        const user = req.user
        const jobId = req.params.jobId
        if (user.savedjob.includes(jobId)) {
            return res.status(200).json({ message: "Job Already Saved" })
        }
        user.savedjob.push(jobId)
        await user.save()
        return res.status(200).json(
            {
                success: true,
                message: "Job Saved"
            }
        )
    } catch (error) {
        console.error(" Error:", error);
        return res.status(500).json({ message: "Something went wrong while Saving Jobs" })
    }
}

export { savedjob}
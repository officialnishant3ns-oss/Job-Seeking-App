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
const getSavedJob = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("savedjob")

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            success: true,
            savedjob: user.savedjob
        });
    } catch (error) {
        console.error(" Error:", error);
        return res.status(500).json({ message: "Something went wrong while geting saved Jobs" })
    }
}
const unsaveJob = async (req, res) => {
    try {
        const user = req.user
        const jobId = req.params.jobId

        if (user.savedjob.includes(jobId)) {

            user.savedjob.pull(jobId)
            await user.save()
            return res.status(200).json({ success: true, message: "Job UnSaved" }
            )
        }
        else{
             return res.status(200).json({ success: false, message: "Job Not Saved" })
        }
    } catch (error) {
        console.error(" Error:", error)
        return res.status(500).json({ message: "Something went wrong while UnSaving Jobs" })
    }
}


export { savedjob, getSavedJob, unsaveJob }
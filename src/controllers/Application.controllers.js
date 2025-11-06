import JobApplication from '../models/application.models.js'
import uploadoncloudinary from '../utils/cloudinary.js'



const ApplyforJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user._id

        const resumePath = req.files?.resume[0]?.path;
        if (!resumePath) {
            return res.status(400).json({ message: "resumePath  is required.. " })

        }
        console.log(resumePath)
        const resume = await uploadoncloudinary(resumePath)

        if (!resume?.secure_url) {
            return res.status(400).json({ message: "Failed to upload resume. " })
        }

        const existingApplication = await JobApplication.findOne({
            JobId: jobId,
            JobSeekerId: userId,
        })
        if (existingApplication) {
            return res.status(409).json({ message: "Already applied to this job." });
        }
        const newApplication = new JobApplication({
            JobId: jobId,
            JobSeekerId: userId,
            resume: resume.secure_url,
            status: "Sent",
        })
        await newApplication.save()
        res.status(201).json({ message: "Applied successfully", application: newApplication });
    } catch (error) {
        console.log("Error fetching jobs:", error)
        return res.status(500).json({ error: error.message })
    }
}

export { ApplyforJob }
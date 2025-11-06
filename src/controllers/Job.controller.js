import Job from '../models/job.models.js'
import JobApplication from '../models/application.models.js'
import uploadoncloudinary from '../utils/cloudinary.js'


const CreateJob = async (req, res) => {
    try {
        if (req.user.role !== "JobsGiver") {
            return res.status(403).json({ message: "Only JobsGiver can post jobs" })
        }
        const { title, description, salary, skillsRequired, experience, jobType } = req.body
        if (!title || !description || !salary || !skillsRequired || !experience || !jobType) {
            return res.status(400).json({ message: "Something is missing" })
        }

        const job = await Job.create({
            jobGiverId: req.user.id,
            title,
            description,
            salary,
            skillsRequired,
            experience,
            jobType

        })


        return res.status(200).json({ success: true, message: "Job created Successfully", job })
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ error: error.message })
    }
}

const updateJob = async (req, res) => {
    try {
        if (req.user.role !== "JobsGiver") {
            return res.status(403).json({ message: "Only JobsGiver can Update jobs" })
        }
        const { jobId } = req.params
        const { title, description, salary, skillsRequired, experience, jobType } = req.body
        if (!title || !description || !salary || !skillsRequired || !experience || !jobType) {
            return res.status(400).json({ message: "Something is missing" })
        }
        const updatedJob = await Job.findOneAndUpdate(
            { _id: jobId, jobGiverId: req.user.id },
            { title, description, salary, skillsRequired, experience, jobType },
            { new: true }
        )
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found or unauthorized" });
        }
        return res.status(200).json({ success: true, message: "Job Updated Successfully", updatedJob })


    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ error: error.message })
    }
}
export { CreateJob, updateJob }
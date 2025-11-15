import uploadoncloudinary from '../utils/cloudinary.js'
import JobApplication from '../models/application.models.js'


const ApplyforJob = async (req, res) => {
    try {
        const { jobId } = req.params
        const userId = req.user._id

        if (req.user.role !== "Jobseeker") {
            return res.status(403).json({ message: "Only Jobseeker can apply for jobs" })
        }


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

const myallapplication = async (req, res) => { // for like if joobseeker want to see their application id 
    try {
        const application = await JobApplication.find({ JobSeekerId: req.user._id })
        if (!application) {
            return res.status(404).json({ message: "Profile not found" })
        }
        res.status(200).json({ application, message: "My application for job" })
    } catch (error) {
        console.log("Error fetching jobs:", error)
        return res.status(500).json({ error: error.message })
    }
}

const updatestatus = async (req, res) => {
    try {
        const { applicationId } = req.params


        if (req.user.role !== "JobsGiver") {
            return res.status(403).json({ message: "Only JobsGiver can Edit" })
        }

        const { status } = req.body
        if (!status) {
            return res.status(400).json({ message: "Status is required" })
        }

        const app = await JobApplication.findById(applicationId)
        if (!app) {
            return res.status(404).json({ message: "Application not found" })
        }

        app.status = status
        await app.save()

        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            updatedApplication: app,
        })
    } catch (error) {
        console.error("Error updating job status:", error)
        return res.status(500).json({ error: error.message })
    }
}

const getApplicationbyJobgiver = async (req, res) => {
    try {
        if (req.user.role !== "JobsGiver") {
            return res.status(403).json({ message: "Only JobsGiver can Edit" })
        }
        const { jobId } = req.params
        console.log(jobId)
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" });
        }

        const applications = await JobApplication.find({ job: jobId })
            .populate("applicant", "firstName lastName email skills bio resume")
            .populate("job", "title companyName")

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this job" })
        }
        res.status(200).json({ success: true, count: applications.length, applications })
    } catch (error) {
        console.error("Error checking applied job by jobseeker:", error)
        return res.status(500).json({ error: error.message })
    }
}


export { ApplyforJob, myallapplication, updatestatus, getApplicationbyJobgiver }
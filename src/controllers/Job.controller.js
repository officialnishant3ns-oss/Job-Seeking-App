import Job from '../models/job.models.js'
import JobsGivers from '../models/Jobgiver.models.js'



const CreateJob = async (req, res) => {
  try {
    if (req.user.role !== "JobsGiver") {
      return res.status(403).json({ message: "Only JobsGiver can post jobs" })
    }
    const { title, description, salaryMin, salaryMax, skillsRequired, experience, jobType, location, category, tags, experienceLevel } = req.body;

    if (!title || !description || !salaryMin || !salaryMax || !skillsRequired || !experience || !jobType || !location) {
      return res.status(400).json({ message: "Something is missing" })
    }
    if (salaryMin < 0 || salaryMax <= 0 || salaryMax < salaryMin) {
      return res.status(400).json({ message: "Invalid salary range" })
    }

    const userId = req.user?._id || req.user?.id;

    const companyProfile = await JobsGivers.findOne({ userId })

    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found" })
    }
    const job = await Job.create({
      jobGiverId: req.user._id,
      companyName: companyProfile.companyName,

      title,
      description,
      location,
      category,
      tags: tags || [],
      experienceLevel,

      salary: {
        min: salaryMin,
        max: salaryMax
      },

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
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" })
    }
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, jobGiverId: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      updatedJob,
    })

  } catch (error) {
    console.log("Error", error)
    return res.status(500).json({ error: error.message })
  }
}

const DeleteJobs = async (req, res) => {
  try {
    if (req.user.role !== "JobsGiver") {
      return res.status(403).json({ message: "Only JobsGiver can Update jobs" })
    }
    const jobId = req.params.jobId
    const deleted = await Job.findOneAndDelete({
      _id: jobId,
      jobGiverId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      deletedJob: deleted,
    })
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ error: error.message });
  }
}

// for seeker
const getjobsbyId = async (req, res) => {
  try {
    const { jobId } = req.params
    const job = await Job.findById(jobId)

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({
      success: true,
      job
    })
  } catch (error) {
    console.log("Error", error)
    return res.status(500).json({ error: error.message })
  }
}

//for seeker there we goining to add search filter
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ jobGiverId: req.user.id })

    return res.status(200).json({
      success: true,
      jobs,
    })
  } catch (error) {
    console.log("Error fetching jobs:", error)
    return res.status(500).json({ error: error.message })
  }
}



export { CreateJob, updateJob, getjobsbyId, getAllJobs, DeleteJobs }
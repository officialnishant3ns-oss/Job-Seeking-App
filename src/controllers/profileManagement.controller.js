import Jobseeker from '../models/Jobseeker.models.js'
import JobsGivers from '../models/Jobgiver.models.js'
import uploadoncloudinary from '../utils/cloudinary.js'
const SeekerProfile = async (req, res) => {
  try {
    const { bio, skills, education, experience } = req.body

    let skillsArray = skills;
    if (typeof skills === "string") {
      skillsArray = skills.split(",").map((s) => s.trim());
    }
    if (!bio || !skills || !education || !experience) {
      return res.status(400).json({ message: "something is missing" })
    }
    const userId = req.user.id

    const profile = await Jobseeker.findOneAndUpdate(
      { userId },
      { bio, skills, education, experience },
      { new: true, upsert: true }
    )

    res.status(200).json({ message: "Profile updated", profile });

  } catch (error) {
    console.error(" Error:", error);
    return res.status(500).json({ message: "Something went wrong while Seeker profile manegement" })
  }
}

const uploadResume = async (req, res) => {
  try {
    const userId = req.user.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const resumePath = req.files?.resume?.[0]?.path;
    if (!resumePath) {
      return res.status(400).json({ message: "resumePath  is required.. " })

    }
    const resume = await uploadoncloudinary(resumePath)

    if (!resume) {
      return res.status(400).json({ message: "Resume is required.. " })
    }

    const profileresume = await Jobseeker.findOneAndUpdate(
      { userId, resume: resume.url },
      { new: true, upsert: true }
    )

    res.status(200).json({ message: "Resume uploaded", profileresume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

export { SeekerProfile, uploadResume }
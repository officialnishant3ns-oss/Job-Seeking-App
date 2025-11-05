import Jobseeker from '../models/Jobseeker.models.js'
import JobsGivers from '../models/Jobgiver.models.js'

const SeekerProfile = async (req, res) => {
  try {
    const { bio, skills, education, experience } = req.body

    if (typeof skills === "string") {
      skills = skills.split(",").map((s) => s.trim());
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
    console.error(" SignIn  Error:", error);
    return res.status(500).json({ message: "Something went wrong while Seeker profile manegement" })
  }
}


export { SeekerProfile }
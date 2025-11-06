import Jobseeker from '../models/Jobseeker.models.js'

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
      { new: true,upsert: true }
    )

    res.status(200).json({ message: "Profile updated", profile });

  } catch (error) {
    console.error(" Error:", error);
    return res.status(500).json({ message: "Something went wrong while Seeker profile manegement" })
  }
}

const uploadResume = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
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

      const resumeDetails = await Jobseeker.findOneAndUpdate(
      { userId },
      { resume: resume.secure_url },
      { new: true, upsert: true ,select: " resume"}
    );

    res.status(200).json({ message: "Resume uploaded", resumeDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

const getMySeekerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Jobseeker.findOne({ userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}




export { SeekerProfile, uploadResume ,getMySeekerProfile}
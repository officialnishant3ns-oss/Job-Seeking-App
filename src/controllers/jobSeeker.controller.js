import Jobseeker from '../models/Jobseeker.models.js'

import uploadoncloudinary from '../utils/cloudinary.js'

const SeekerProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phonenumber,
      chooselanguage,
      bio,
      education,
      skills,
      experience
    } = req.body

    if (!firstName || !lastName || !phonenumber || !skills) {
      return res.status(400).json({ message: "Required fields are missing" })
    }

    const userId = req.user?._id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" })
    }

    let profile = await Jobseeker.findOneAndUpdate(
      { userId },
      {
        firstName,
        lastName,
        phonenumber,
        chooselanguage,
        bio,
        education,
        skills,
        experience
      },
      { new: true, runValidators: true }
    )

    if (!profile) {
      profile = await Jobseeker.create({
        userId,
        firstName,
        lastName,
        phonenumber,
        chooselanguage,
        bio,
        education,
        skills,
        experience
      })
    }

    return res.status(200).json({
      message: "Profile saved successfully",
      profile
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// const uploadResume = async (req, res) => {
//   try {
//     const userId = req.user?._id || req.user?.id;
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized user" });
//     }
//     const resumePath = req.files?.resume[0]?.path;
//     if (!resumePath) {
//       return res.status(400).json({ message: "resumePath  is required.. " })

//     }
//     console.log(resumePath)
//     const resume = await uploadoncloudinary(resumePath)

//     if (!resume?.secure_url) {
//       return res.status(400).json({ message: "Failed to upload resume. " })
//     }

//     const resumeDetails = await Jobseeker.findOneAndUpdate(
//       { userId },
//       { resume: resume.secure_url },
//       { new: true, upsert: true }
//     )

//     res.status(200).json({ message: "Resume uploaded", resumeDetails })
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }

// }
const uploadResume = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    //  CHANGE 1: read buffer instead of path
    const resumeFile = req.files?.resume?.[0];
    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // CHANGE 2: upload buffer to Cloudinary
    const resume = await uploadoncloudinary(resumeFile.buffer);

    if (!resume?.secure_url) {
      return res.status(400).json({ message: "Failed to upload resume" });
    }

    const resumeDetails = await Jobseeker.findOneAndUpdate(
      { userId },
      { resume: resume.secure_url },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeDetails,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getMySeekerProfile = async (req, res) => {  //if particular jobseeker looking for their profile view then for that we can ud=se this
  try {
    const userId = req.user.id;
    const profile = await Jobseeker.findOne({ userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" })
    res.status(200).json(profile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
export { SeekerProfile, uploadResume, getMySeekerProfile }
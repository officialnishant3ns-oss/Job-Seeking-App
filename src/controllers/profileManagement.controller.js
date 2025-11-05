import Jobseeker from '../models/Jobseeker.models.js'
import JobsGivers from '../models/Jobgiver.models.js'

const SeekerProfile = async (req, res) => {
  try {
    const { bio, skills, education, experience } = req.body

    if (!bio || !skills || !education || !experience) {
      return res.status(400).json({ message: "something is missing" })
    }
    const userId = req.user.id
    
        const resumeUrl = await req.files?.avatar[0]?.path



    const profile = await Jobseeker.findOneAndUpdate(
      { userId },
      { bio, skills, education, experience },
      { new: true, upsert: true }
    )

   res.status(200).json({ message: "Profile updated", profile });

  } catch (error) {
    console.error(" Seeker profile Error:", error);
    return res.status(500).json({ message: "Something went wrong while Seeker profile manegement" })
  }
}

const uploadResume = async (req,res)=>{
  try {
    const resumeUrl = await req.files?.avatar[0]?.path
    

    const profile = await SeekerProfile.findOneAndUpdate(
      { resumeUrl },
      { new: true, upsert: true }
    )

    res.status(200).json({ message: "Resume uploaded", resumeUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

export { SeekerProfile }
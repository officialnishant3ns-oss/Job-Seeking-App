import JobsGivers from '../models/Jobgiver.models.js'
import uploadoncloudinary from '../utils/cloudinary.js'

const JobGiverProfile = async (req, res) => {
    try {
        const { companyName, description, location } = req.body
        if (!companyName || !description || !location) {
            return res.status(400).json({ message: "All fields (companyName, description, location) are required" })
        }
        const userId = req.user?._id || req.user?.id
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        const company = await JobsGivers.findOneAndUpdate(
            { userId },
            { companyName, description, location },
            { new: true, upsert: true }
        )
        res.status(200).json({ message: "Company profile updated", company })


    } catch (error) {
        console.error(" Error:", error);
        return res.status(500).json({ message: "Something went wrong while giver profile management" })
    }
}

const uploadLogo = async(req,res)=>{
    try {
   const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const LogoPath = req.files?.Logo[0]?.path;
    if (!LogoPath) {
      return res.status(400).json({ message: "LogoPath  is required.. " })

    }
    console.log(LogoPath)
    const Logo = await uploadoncloudinary(LogoPath)

    if (!Logo?.secure_url) {
      return res.status(400).json({ message: "Failed to upload Logo. " })
    }

      const LogoDetails = await JobsGivers.findOneAndUpdate(
      { userId },
      { Logo: Logo.secure_url },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Logo uploaded", LogoDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const getMyCompanyProfile = async (req,res) => {
    try {
    const userId = req.user.id;
    const company = await JobsGivers.findOne({ userId });
    if (!company) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

export { JobGiverProfile,uploadLogo,getMyCompanyProfile }
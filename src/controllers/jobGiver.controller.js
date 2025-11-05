import JobsGivers from '../models/Jobgiver.models.js'


const JobGiverProfile = async (req, res) => {
    try {
        const { companyName, description, location } = req.body
        if (!companyName || !description || !location) {
            return res.status(400).json({ message: "something is missing" })
        }
        const userId = req.user.id

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



export { JobGiverProfile }
import User from '../models/user.models.js'

const followUser = async (req, res) => {
    try {
        const myself = req.user.id
        const otherTofollow = req.params.userId

        if (myself.toString() === otherTofollow.toString()) {
            return res.status(400).json({ message: "Can't Follow Yourself" })
        }
        const user = await User.findById(myself)
        const ToFollow = await User.findById(otherTofollow)

        if (!user || !ToFollow) {
            return res.status(404).json({ message: "User OR Following person not found" })
        }
        const alreadyFollowing = user.following.some(
            id => id.toString() === otherTofollow.toString()
        )
        if (alreadyFollowing) {
            return res.status(409).json({
                success: false,
                message: "Already following this user"
            })
        }
        user.following.push(otherTofollow)
        ToFollow.followers.push(myself)

        await user.save()
        await ToFollow.save()
        return res.status(200).json({ message: "Followed", success: true })

    } catch (error) {
        console.error(" Error:", error)
        return res.status(500).json({ message: "Something went wrong while Following user" })
    }
}

//unfollow user
const unfollow = async (req, res) => {
    try {
        const myself = req.user.id
        const otherToUnfollow = req.params.userId

        if (myself.toString() === otherToUnfollow.toString()) {
            return res.status(400).json({ message: "You cannot unfollow yourself" })
        }

        const user = await User.findById(myself)
        const ToUnFollow = await User.findById(otherToUnfollow)

        if (!user || !ToUnFollow) {
            return res.status(404).json({ message: "User not found" })
        }

        const isFollowing = user.following.includes(otherToUnfollow)

        if (!isFollowing) {
            return res.status(400).json({ message: "You are not following this user" })
        }

        user.following = user.following.filter(
            (id) => id.toString() !== otherToUnfollow.toString()
        )

        ToUnFollow.followers = ToUnFollow.followers.filter(
            (id) => id.toString() !== myself.toString()
        )

        await user.save()
        await ToUnFollow.save()

        return res.status(200).json({
            message: "Successfully unfollowed user",
            success: true
        })

    } catch (error) {
        console.error("Error:", error)
        return res.status(500).json({
            message: "Something went wrong while unfollowing user"
        })
    }
}




export { followUser,unfollow }
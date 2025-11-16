import Post from '../models/post.models.js'
import uploadoncloudinary from '../utils/cloudinary.js'

const createPost = async (req, res) => {
    try {
        const { text, mediaType } = req.body
        const mediaUrl = req.files?.mediaUrl[0]?.path
        if (!text && !mediaUrl) {
            return res.status(400).json({ message: "Post cannot be empty. Add text or media." })
        }
        console.log(mediaUrl)

        const postmedia = await uploadoncloudinary(mediaUrl)
        if (!postmedia?.secure_url) {
            return res.status(400).json({ message: "Failed to upload post media. " })
        }

        const newPost = await Post.create({
            text,
            mediaUrl: postmedia?.secure_url,
            mediaType,
            createdBy: req.user.id
        })
        const populatedPost = await newPost.populate({
            path: "createdBy",
            select: "fullname email"
        })
        res.status(201).json({ message: "Post Created", newPost: populatedPost })

    } catch (error) {
        console.error(" Error:", error)
        return res.status(500).json({ message: "Something went wrong while Posting SocialPost" })
    }
}

const getFeed = async (req, res) => {
    try {
        const following = req.user.following

        const feed = await Post.find({ createdBy: { $in: [...following, req.user._id] } }).populate({
            path: "createdBy",
            select: "fullname email"
        }).sort({ createdAt: -1 })

        return res.status(200).json({ success: true, feed });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const likepost = async (req, res) => {
    try {
        const { postId } = req.params
        const userId = req.user.id
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        if (post.likes.includes(userId)) {
            post.likes.pull(userId)
            await post.save()
            return res.status(200).json({ message: "Unliked successfully", success: true })
        }
        post.likes.push(userId)
        await post.save()
        return res.status(200).json({ message: "liked successfully", success: true })

    } catch (error) {
        console.error(" Error:", error)
        return res.status(500).json({ message: "Something went wrong while liking SocialPost" })

    }

}
const commentonpost = async (req, res) => {
    try {
        const { postId } = req.params
        const userId = req.user.id
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        const { commenttext } = req.body
        if (!commenttext) {
            return res.status(404).json({ message: "Please write Something In Comments" })
        }

        post.comments.push({ user: userId, commenttext: commenttext })
        await post.save()


        const updatedPost = await Post.findById(postId)
            .populate("comments.user", "name")
        return res.status(200).json({ message: "comments successfully", success: true, comments: updatedPost.comments })

    } catch (error) {
        console.error(" Error:", error)
        return res.status(500).json({ message: "Something went wrong while commenting on SocialPost" })

    }
}
export { createPost, getFeed, likepost, commentonpost }
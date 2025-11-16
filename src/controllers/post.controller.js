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




export { createPost }
import Post from '../models/post.models.js'

const createPost = async (req, res) => {
    try {
        const { text, mediaUrl, mediaType } = req.body
        if (!text && !mediaUrl) {
            return res.status(400).json({ message: "Post cannot be empty. Add text or media." })
        }
        const newPost = await Post.create({
            text,
            mediaUrl,
            mediaType,
            createdBy: req.user.id
        })
        res.status(201).json({ message: "Post Created", newPost })

    } catch (error) {
        console.error(" Error:", error)
        return res.status(500).json({ message: "Something went wrong while Posting SocialPost" })
    }
}




export { createPost }
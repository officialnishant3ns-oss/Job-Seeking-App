import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
    {
        text: {
            type: String
        },
        mediaUrl: {
            type: String
        },

        mediaType: {
            type: String,
            enum: ["image", "video"],
            default: null
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                text: String,
                createdAt: { type: Date, default: Date.now }
            }
        ]

    },
    { timestamps: true }
)

const Post = mongoose.model("Post", PostSchema)
export default Post

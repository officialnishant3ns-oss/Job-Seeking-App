import axios from "axios"

export const commentFilter = async (req, res, next) => {
    try {
        const { commenttext } = req.body

        if (!commenttext) {
            return res.status(400).json({ message: "Please write something in the comment" })
        }

        const badWords = [
            "mc", "mcd", "bc",
            "madharchod", "madarchod", "madar", "chod",
            "bhosdike", "bsdk", "chutiya",
            "randi", "lund", "gandu", "gaand", "phudi"
        ]

        const lower = commenttext.toLowerCase()

        const hasProfanity = badWords.some(bad =>
            lower.includes(bad)
        )

        if (hasProfanity) {
            return res.status(400).json({
                message: "Comment blocked due to profanity.",
                filter_reason: "Manual profanity detection triggered"
            })
        }

        const response = await axios.post(
            "https://spam-detection-and-profanity-filter-fkdw.onrender.com/predict/",
            { comment: commenttext }
        )

        const result = response.data

        const spamLimit = 0.90
        const profanityLimit = 0.90

        const isSpam = result.spam_probability >= spamLimit
        const isProfanityAI = result.profanity_probability >= profanityLimit

        if (isSpam || isProfanityAI) {
            return res.status(400).json({
                message: "Comment blocked due to spam/profanity (AI detection).",
                filter_result: result
            })
        }

        req.body.commenttext = result.cleaned_comment

        next()

    } catch (error) {
        console.error("Comment Filter Error:", error.message)
        return res.status(500).json({
            message: "Error while filtering comment",
            error: error.message
        })
    }
}

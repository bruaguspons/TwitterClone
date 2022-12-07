const auth = require('../../../auth')
const User = require('mongoose').model('User')
const Post = require('mongoose').model('Post')

const deleteComment = async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    if (user._id === req.comment.author) {
        await req.post.comments.remove(req.comment._id)
        await req.post.save()
        await Comment.findOne({ _id: req.comment._id }).remove()
        res.sendStatus(204)
    } else {
        res.sendStatus(400)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const authChecking = auth.requireToken(req)
        if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

        const { id } = authChecking
        if (req.post.author.toString() === id.toString()) {

            for (const commentId of req.post.comments) {
                await Comment.findOne({ _id: commentId }).remove()
            }

            await req.post.remove()
            return res.sendStatus(204)
        } else[
            res.sendStatus(404)
        ]
    } catch (error) {
        next(error)
    }
}

module.exports = {
    deleteComment,
    deletePost
}
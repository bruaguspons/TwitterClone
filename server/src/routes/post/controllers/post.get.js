const auth = require('../../../auth')
const User = require('mongoose').model('User')
const Post = require('mongoose').model('Post')

const getFeed = async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    if (!user) return res.sendStatus(404)
    const offset = req.query.offset ?? 0
    const limit = req.query.limit ?? 20
    const authores = [...user.following, user._id]

    const posts = await Post.find({ author: { $in: authores } }).skip(Number(offset)).limit(Number(limit)).sort({ createdAt: 'desc' })

    const resu = []
    for (const post of posts) {
        resu.push(await post.toJSON())
    }

    return res.json({
        post: resu,
        count: posts.length
    })

}

const getAllPost = async (req, res) => {
    const offset = req.query.offset ?? 0
    const limit = req.query.limit ?? 20
    const posts = await Post.find().skip(Number(offset)).limit(Number(limit)).sort({ createdAt: 'desc' })


    const resu = []
    for (const post of posts) {
        resu.push(await post.toJSON())
    }

    return res.json({
        post: resu,
        count: posts.length
    })
}

const getComments = async (req, res, next) => {
    const { comments } = req.post
    const resu = []
    for (const commentId of comments) {
        const comment = await Comment.findById(commentId)
        resu.push(await comment.toJSON())
    }
    return res.json({
        comments: resu,
        count: comments.length
    })
}

const getSinglePost = async (req, res, next) => {
    return res.json(await req.post.toJSON())
}

module.exports = {
    getSinglePost,
    getComments,
    getAllPost,
    getFeed
}
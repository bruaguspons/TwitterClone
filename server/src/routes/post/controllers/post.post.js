const auth = require('../../../auth')
const User = require('mongoose').model('User')
const Post = require('mongoose').model('Post')

const createPost = async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    const post = Post({ ...JSON.parse(req.body.content).post, image: req.file?.path })
    post.author = user._id;

    post.authorName = user.userName
    await post.save()
    return res.json({ post: await post.toJSON() })
}

const createComment = async (req, res, next) => {

    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    const comment = await Comment(req.body)

    comment.author = user._id
    comment.post = req.post._id
    await comment.save()
    req.post.comments.push(comment._id)
    await req.post.save()
    return res.json({ comment: await comment.toJSON() })
}

const postLikes = async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    res.json({ likes: req.post.likes(id) })
}

module.exports = {
    postLikes,
    createComment,
    createPost
}
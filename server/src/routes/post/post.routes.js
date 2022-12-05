const auth = require('../../auth')

const route = require('express').Router()
const User = require('mongoose').model('User')
const Post = require('mongoose').model('Post')
const Comment = require('mongoose').model('Comment')

route.param('post', async (req, res, next, slug) => {
    try {

        const post = await Post.findOne({ slug })
        post.populate('author')

        if (!post) return res.sendStatus(404)
        req.post = post
        return next()
    } catch (error) {
        next(error)
    }
})
route.param('comment', async (req, res, next, id) => {
    const comment = await Comment.findById(id)
    if (!comment) return res.sendStatus(404)
    req.comment = comment
    return next()
})

// get all posts
route.get('/', async (req, res) => {
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
})
// get user feed
route.get('/feed', async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    if (!user) return res.sendStatus(404)
    const offset = req.query.offset ?? 0
    const limit = req.query.limit ?? 20
    const posts = await Post.find({ author: { $in: user.following } }).skip(Number(offset)).limit(Number(limit)).sort({ createdAt: 'desc' })

    const resu = []
    for (const post of posts) {
        resu.push(await post.toJSON())
    }

    return res.json({
        post: resu,
        count: posts.length
    })

})
// create new post
route.post('/', async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    const post = Post(req.body.post)
    post.author = user._id;
    console.log(user.userName)
    post.authorName = user.userName
    await post.save()
    return res.json({ post: await post.toJSON() })
})
// get a single post
route.get('/:post', async (req, res, next) => {
    return res.json(await req.post.toJSON())
})
// get comments from one post
route.get('/:post/comments', async (req, res, next) => {
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
})
// create a new comment
route.post('/:post/comments', async (req, res, next) => {

    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    const comment = await Comment(req.body.comment)
    comment.author = user._id
    comment.post = req.post._id
    await comment.save()
    return res.json({ comment: comment.toJSON() })
})
// delete comment
route.delete('/:post/comments/:comment', async (req, res, next) => {
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
})

module.exports = route
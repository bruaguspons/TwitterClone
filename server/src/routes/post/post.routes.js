const route = require('express').Router()
const Post = require('mongoose').model('Post')
const Comment = require('mongoose').model('Comment')
const { createPost, createComment, postLikes } = require('./controllers/post.post')
const { deleteComment, deletePost } = require('./controllers/post.delete')
const { getComments, getSinglePost, getFeed, getAllPost } = require('./controllers/post.get')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const update = multer({ storage: storage })


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
route.get('/', getAllPost)
// get user feed
route.get('/feed', getFeed)
// get a single post
route.get('/:post', getSinglePost)
// get comments from one post
route.get('/:post/comments', getComments)


// create new post
route.post('/', update.single('file'), createPost)
// create a new comment
route.post('/:post/comments', createComment)
// likes on posts
route.post('/:post/favorite', postLikes)


// delete comment
route.delete('/:post/comments/:comment', deleteComment)
// Delete Post
route.delete('/:post', deletePost)
module.exports = route

const User = require('mongoose').model('User')
const route = require('express').Router()
const { unFollowUser } = require('./controllers/profile.delete')
const { getRandomUsers, getSingleUser } = require('./controllers/profile.get')
const { followUser } = require('./controllers/profile.post')

route.param('userName', async (req, res, next, userName) => {
    try {
        const user = await User.findOne({ userName })
        if (!user) return res.sendStatus(404)
        req.profile = user
        return next()
    } catch (error) {
        next(error)
    }
})
// get randoms users
route.get('/random', getRandomUsers)
// getSingle User
route.get('/:userName', getSingleUser)

// follow Someone
route.post('/follow/:userName', followUser)

// unFollow User
route.delete('/follow/:userName', unFollowUser)

module.exports = route
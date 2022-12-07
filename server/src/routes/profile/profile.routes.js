const auth = require('../../auth')
const User = require('mongoose').model('User')
const route = require('express').Router()

route.get('/random', async (req, res, next) => {
    const users = await User.find()
    const query = []
    const count = users.length < 3 ? users.length : 3
    for (let i = 0; i < count; i++) {
        const random = Math.floor(Math.random() * count)
        const user = users[random]
        users.splice(random, 1)
        query.push(user.toProfileJSON())
    }
    return res.json({ users: query })
})
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

route.get('/:userName', async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    if (!user) return res.json({ profile: req.profile.toProfileJSON(false) })
    return res.json({ profile: req.profile.toProfileJSON(user) });
})


route.post('/follow/:userName', async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    if (!user) return res.json({ profile: req.profile.toProfileJSON(false) })
    await user.follow(req.profile._id)
    return res.json({ profile: req.profile.toProfileJSON(user) });
})

route.delete('/follow/:userName', async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    if (!user) return res.json({ profile: req.profile.toProfileJSON(false) })
    await user.unfollow(req.profile._id)
    return res.json({ profile: req.profile.toProfileJSON(user) });
})

module.exports = route
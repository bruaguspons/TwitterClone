const auth = require('../../../auth')
const User = require('mongoose').model('User')
const getRandomUsers = async (req, res, next) => {
    const users = await User.find()
    const query = []
    const count = users.length < 5 ? users.length : 5
    for (let i = 0; i < count; i++) {
        const random = Math.floor(Math.random() * count)
        const user = users[random]
        users.splice(random, 1)
        query.push(user.toProfileJSON())
    }
    return res.json({ users: query })
}

const getSingleUser = async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    if (!user) return res.json({ profile: req.profile.toProfileJSON(false) })
    return res.json({ profile: req.profile.toProfileJSON(user) });
}

module.exports = {
    getRandomUsers,
    getSingleUser,
}
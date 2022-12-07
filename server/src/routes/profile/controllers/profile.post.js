const auth = require('../../../auth')
const User = require('mongoose').model('User')
const followUser = async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const user = await User.findById(id)
    if (!user) return res.json({ profile: req.profile.toProfileJSON(false) })
    await user.follow(req.profile._id)
    return res.json({ profile: req.profile.toProfileJSON(user) });
}

module.exports = {
    followUser
}
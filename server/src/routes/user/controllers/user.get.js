const auth = require('../../../auth')
const User = require('mongoose').model('User')
const getUser = async (req, res, next) => {
    if (!auth.requireToken(req)) return res.status(404).json({ 'errors': "Invalid token" })

    const { id, userNmae } = auth.requireToken(req)
    try {
        const { email, password } = req.body.user
        const user = await User.findById(id)
        if (!user) return res.sendStatus(404)
        return res.json({ user: user.toAuthJSON() })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getUser
}
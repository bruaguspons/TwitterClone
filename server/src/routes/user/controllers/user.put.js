const auth = require('../../../auth')
const User = require('mongoose').model('User')
const changeUser = async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    try {
        const user = await User.findById(id)
        if (req.body.content) {
            const { userName, email, password, bio } = JSON.parse(req.body.content).user

            if (userName) {
                user.userName = userName
            }
            if (email) {
                user.email = email
            }
            if (bio) {
                user.bio = bio
            }
            if (password) {
                await user.setPassword(password)
            }
        }
        if (req.file?.path) {
            user.image = req.file?.path
        }

        await user.save()
        return res.json({ "user": user.toAuthJSON() })
    } catch (error) {
        next(error)
    }

}
module.exports = {
    changeUser
}
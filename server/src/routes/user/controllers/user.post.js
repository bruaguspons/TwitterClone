const auth = require('../../../auth')
const User = require('mongoose').model('User')
const createUser = async (req, res, next) => {
    try {
        const { userName, email, password1, password2 } = req.body.user
        if (password1 !== password2) return res.status(400).json({ 'password': "the passwords are not the same" })
        const user = await User({ userName, email })
        await user.setPassword(password1)
        await user.save()

        return res.json({ user: user.toAuthJSON() })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body.user
    if (!email) {
        return res.status(400).json({ errors: { email: "can't be blank" } });
    }

    if (!password) {
        return res.status(400).json({ errors: { password: "can't be blank" } });
    }
    const data = await auth.checkUser(email, password)

    if (!data) return res.status(400).json({ errors: "email or passowd are wrong" })
    return res.json({ user: data })
}

module.exports = {
    createUser,
    loginUser
}
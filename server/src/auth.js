const jwt = require('jsonwebtoken')
const secret = process.env.secret || '123'
const User = require('./models/user.model')


const getTokenFromHeader = (req) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0].toLowerCase() === "bearer") {
        return jwt.verify(req.headers.authorization.split(" ")[1], secret)
    }
    return null
}

const verifyEmailPassword = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) return null
    if (! await user.validatePassword(password)) return null
    return user.toAuthJSON()
}


const auth = {
    requireToken: getTokenFromHeader,
    checkUser: verifyEmailPassword
}

module.exports = auth
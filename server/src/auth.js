const { expressjwt: jwt } = require('express-jwt')
const secret = process.env.secret || '123'
const getTokenFromHeader = (req) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1]
    }
    return null
}

const auth = {
    required: jwt({
        algorithms: ["HS256"],
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    optional: jwt({
        algorithms: ["HS256"],
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
}

module.exports = auth
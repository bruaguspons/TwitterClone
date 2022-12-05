const auth = require('../../auth')
const User = require('mongoose').model('User')
const route = require('express').Router()

route.get('', async (req, res, next) => {
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
})

route.post('', async (req, res, next) => {
    try {
        const { userName, email, password } = req.body.user
        console.log(userName, email, password)
        const user = await User({ userName, email })
        await user.setPassword(password)
        await user.save()

        return res.json({ user: user.toAuthJSON() })
    } catch (error) {
        next(error)
    }
})

route.post('/login', async (req, res, next) => {
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
})

route.put('', async (req, res, next) => {
    const authChecking = auth.requireToken(req)
    if (!authChecking) return res.status(404).json({ 'errors': "Invalid token" })

    const { id } = authChecking
    const { userName, email, password, bio, img } = req.body.user
    try {
        const user = await User.findById(id)
        console.log(user)
        if (userName) {
            user.userName = userName
        }
        if (email) {
            user.email = email
        }
        if (bio) {
            user.bio = bio
        }
        if (img) {
            user.img = img
        }
        if (password) {
            await user.setPassword(password)
        }
        await user.save()
        return res.json({ "user": user.toAuthJSON() })
    } catch (error) {
        next(error)
    }

})

module.exports = route
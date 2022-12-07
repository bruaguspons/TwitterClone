const auth = require('../../auth')
const User = require('mongoose').model('User')
const route = require('express').Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const update = multer({ storage: storage })

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
        const { userName, email, password1, password2 } = req.body.user
        if (password1 !== password2) return res.status(400).json({ 'password': "the passwords are not the same" })
        const user = await User({ userName, email })
        await user.setPassword(password1)
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

route.put('', update.single('file'), async (req, res, next) => {
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

})

module.exports = route
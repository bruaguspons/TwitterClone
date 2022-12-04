const auth = require('../../auth')
const User = require('../../models/user.model')
const passport = require('passport')
const route = require('express').Router()

route.get('', auth.required, async (req, res, next) => {
    try {
        const user = await User.findById(req.payload.id)
        if (!user) return res.sendStatus(404)
        return res.json({ user: user.toAuthJson() })
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
        console.log('-------------------------------------------')
        console.log(user)
        return res.json({ user: user.toAuthJSON() })
    } catch (error) {
        next(error)
    }
})

// route.post('/login', (req, res, next) => {
//     if (!req.body.user.email) {
//         return res.status(422).json({ errors: { email: "can't be blank" } });
//     }

//     if (!req.body.user.password) {
//         return res.status(422).json({ errors: { password: "can't be blank" } });
//     }
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if (err) return next(err)

//         if (user) {
//             user.token = user.generateJWT()
//             return res.json({ user: user.toAuthJson() })
//         } else {
//             return res.status(422).json(info);
//         }
//     })
// })

module.exports = route
const express = require('express')
const cors = require('cors')
const { connect } = require('mongoose')
require('dotenv').config()
require('./src/models/index.models').models()
const RouteUser = require('./src/routes/user/user.routes')
const RouteProfile = require('./src/routes/profile/profile.routes')
const RoutePosts = require('./src/routes/post/post.routes')

const app = express()
app.use(cors())
app.use('/images', express.static('images'));
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use('/user', RouteUser)
app.use('/profile', RouteProfile)
app.use('/posts', RoutePosts)

app.use((err, req, res, next) => {
    res.status(err.status || 404).json({
        'errors': {
            message: err.message
        }
    });
})


const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/TwitterClone'
connect(MONGO_URL)
    .then(() => app.listen(PORT, () => {
        console.log('server on port:' + PORT)
    }))
    .catch(err => console.log(err))
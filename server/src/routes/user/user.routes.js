const route = require('express').Router()
const { getUser } = require('./controllers/user.get')
const { createUser, loginUser } = require('./controllers/user.post')
const { changeUser } = require('./controllers/user.put')

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
// get loged user
route.get('', getUser)

// create an user
route.post('', createUser)
// login a user
route.post('/login', loginUser)

// change user data
route.put('', update.single('file'), changeUser)

module.exports = route
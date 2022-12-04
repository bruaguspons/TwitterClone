const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.secret || '123'

const userSchema = new Schema({
    userName: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'cant be blank'],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'cant be blank'],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    hash: String,
    bio: String,
    Img: String,
    favorite: [{ type: ObjectId, ref: 'Post' }],
    following: [{ type: ObjectId, ref: 'User' }],
}, {
    timestamps: true
})

userSchema.methods.setPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)

    this.hash = await bcrypt.hash(password.toString(), salt)
}

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.hash)
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({
        id: this._id,
        userName: this.userName
    }, secret)
}
userSchema.methods.toAuthJSON = function () {
    return {
        userName: this.userName,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
}

module.exports = model('User', userSchema)
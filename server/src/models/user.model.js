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
    image: String,
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
    return await bcrypt.compare(password.toString(), this.hash)
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
        image: this.image,
        id: this._id
    };
}

userSchema.methods.toProfileJSON = function (user) {
    return {
        userName: this.userName,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false
    }
}
userSchema.methods.isFollowing = function (id) {
    return this.following.some((followId) => followId.toString() === id.toString());
};
userSchema.methods.follow = function (id) {
    if (this.following.indexOf(id) === -1) {
        this.following.push(id);
        return this.save();
    }

};
userSchema.methods.unfollow = function (id) {
    // console.log(this.following.some(followId => followId.equals(id)))
    if (this.following.some(followId => followId.equals(id))) {
        this.following = this.following.filter(followId => !followId.equals(id))
        return this.save()
    }
}

model('User', userSchema)
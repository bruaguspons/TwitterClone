const User = require('mongoose').model('User')
const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId


const postSchema = new Schema({
    slug: { type: String, unique: true, requiredL: true, lowercase: true },
    content: String,
    favorire: [{ type: ObjectId, ref: 'User' }],
    tagList: [String],
    comments: [{ type: ObjectId, ref: 'Comment' }],
    authorName: String,
    author: { type: ObjectId, ref: 'User' },
    image: String
}, {
    timestamps: true,
})

postSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slug = this.authorName + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
    }
    next()
})

postSchema.methods.likes = function (id) {
    if (this.favorire.some(idFavorite => idFavorite.equals(id))) {
        this.favorire = this.favorire.filter(idFavorite => !idFavorite.equals(id))
    } else {
        this.favorire.push(id)
    }

    this.save()
    return this.favorire
}

postSchema.methods.toJSON = async function () {
    const user = await User.findById(this.author)
    return {
        slug: this.slug,
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        tagList: this.tagList,
        // favorited: user ? user.isFavorite(this._id) : false,
        favorire: this.favorire,
        author: user.toProfileJSON(),
        image: this.image
    }
}
model('Post', postSchema)
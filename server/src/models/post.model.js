const User = require('mongoose').model('User')
const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId


const postSchema = new Schema({
    slug: { type: String, unique: true, requiredL: true, lowercase: true },
    content: String,
    favoritesCount: { type: Number, default: 0 },
    tagList: [String],
    comments: [{ type: ObjectId, ref: 'Comment' }],
    authorName: String,
    author: { type: ObjectId, ref: 'User' },
}, {
    timestamps: true,
})

postSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slug = this.authorName + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
    }
    next()
})

postSchema.methods.toJSON = async function () {
    const user = await User.findById(this.author)
    return {
        slug: this.slug,
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        tagList: this.tagList,
        // favorited: user ? user.isFavorite(this._id) : false,
        favoritesCount: this.favoritesCount,
        author: user.toProfileJSON()
    }
}
model('Post', postSchema)
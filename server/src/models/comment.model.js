const User = require('mongoose').model('User')
const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId
const commentSchema = new Schema({
    content: String,
    author: { type: ObjectId, ref: 'User' },
    post: { type: ObjectId, ref: 'Post' }
}, {
    timestamps: true,
    versionKey: false
})

commentSchema.methods.toJSON = async function () {
    const author = await User.findById(this.author)
    return {
        id: this._id,
        content: this.content,
        createdAt: this.createdAt,
        author: author.toProfileJSON()
    };
};

model('Comment', commentSchema)
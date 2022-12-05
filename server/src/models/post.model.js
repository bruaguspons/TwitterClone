const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types
const postSchema = new Schema({
    slug: { type: String, unique: true, lowercase: true },
    title: String,
    content: String,
    favoritesCount: { type: Number, default: 0 },
    comments: { type: ObjectId, ref: 'Comment' },
    tagList: [{ type: String }],
    author: { type: ObjectId, ref: 'User' },
}, {
    timestamps: true,
    versionKey: false
})
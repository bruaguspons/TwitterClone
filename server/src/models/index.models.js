
const models = () => {
    require('./user.model')
    require('./post.model')
    require('./comment.model')
}
module.exports = { models }
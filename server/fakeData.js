const { faker } = require('@faker-js/faker');
const { connect, connection } = require('mongoose')
require('./src/models/index.models').models()
const User = require('mongoose').model('User')
const Post = require('mongoose').model('Post');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/TwitterClone'

const makeData = async () => {
    await connect(MONGODB_URL)
    const users = []
    for (let i = 0; i < 10; i++) {
        const name = faker.name.firstName(i % 2 == 0 ? 'female' : 'male')
        const user = await User({ userName: name, email: faker.internet.email(name), image: faker.image.avatar(), bio: faker.lorem.sentence(8) })
        user.setPassword(faker.internet.password(20))
        await user.save()
        users.push(user)
        console.log(user)
    }
    for (let i = 0; i < 10; i++) {
        const likes = []
        for (let j = 0; j < 5; j++) {
            const index = Math.round(Math.random())
            if (index) {
                likes.push(users[j]._id)
            }
        }
        const post = await Post({ author: users[i]._id, content: faker.lorem.text(), image: faker.image.nature(640, 480, true), favorire: likes })
        await post.save()
        console.log(post)
    }
    await connection.close()
}
makeData()
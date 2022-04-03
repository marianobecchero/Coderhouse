let UserDao

const execute = async() => {
    const { UserDaoMongoDB } = require('./users/UserDaoMongoDB.js')
    UserDao = new UserDaoMongoDB()
}
execute()

module.exports = { UserDao }
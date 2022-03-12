let MessageDao

const execute = async() => {
    const { MessageDaoMongoDB } = require('./messages/MessageDaoMongoDB.js')
    MessageDao = new MessageDaoMongoDB()
}
execute()

module.exports = { MessageDao }
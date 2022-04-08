let MessageDao

const execute = async() => {
    const { MessageDaoMongoDB } = require('./messages/MessageDaoMongoDB')
    MessageDao = new MessageDaoMongoDB()
}
execute()

module.exports = { MessageDao }
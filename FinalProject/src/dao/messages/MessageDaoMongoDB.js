const { MongoDBContainer } = require('../../persistence/containers/MongoDBContainer')

class MessageDaoMongoDB extends MongoDBContainer {

    constructor() {
        super('messages', {
            username: { type: String, required: true },
            date: { type: Date, required: true },
            text: { type: String, require: true }
        })
        if (typeof MessageDaoMongoDB.instance === 'object') {
            return MessageDaoMongoDB.instance;
          }
          MessageDaoMongoDB.instance = this;
          return this;
    }
}

module.exports = { MessageDaoMongoDB }
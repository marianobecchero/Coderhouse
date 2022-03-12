const { MongoDBContainer } = require('../../persistence/containers/MongoDBContainer')

class MessageDaoMongoDB extends MongoDBContainer {

    constructor() {
        super('messages', {
            author: {
                id: { type: String, required: true },
                nombre: { type: String, required: true },
                apellido: { type: String, required: true },
                edad: { type: String, required: true },
                alias: { type: String, required: true },
                avatar: { type: String, required: true }
            },
            message: { type: String, required: true },
            date: { type: String, required: true },
            id: { type: Number, require: true }
        })
        if (typeof MessageDaoMongoDB.instance === 'object') {
            return MessageDaoMongoDB.instance;
          }
          MessageDaoMongoDB.instance = this;
          return this;
        /*super('mesagges', {
            id: { type: String, required: true },
            email: { type: String, required: true },
            nombre: { type: String, required: true },
            apellido: { type: String, required: true },
            edad: { type: Number, required: true },
            alias: { type: String, required: true },
            avatar: { type: String, required: true },
            mensaje: { type: String, required: true },
            fecha: { type: String, required: true }
        })*/
    }
}

module.exports = { MessageDaoMongoDB }
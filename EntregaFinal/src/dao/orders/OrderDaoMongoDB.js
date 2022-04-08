const { MongoDBContainer } = require('../../persistence/containers/MongoDBContainer')

class OrderDaoMongoDB extends MongoDBContainer {

    constructor() {
        super('orders', {
            //id: { type: Date, required: true },
            fecha: { type: Date, required: true },
            idUser: { type: String, required: true },
            products: { type: Array, required: true }
        })
        if (typeof OrderDaoMongoDB.instance === 'object') {
            return OrderDaoMongoDB.instance;
          }
          OrderDaoMongoDB.instance = this;
          return this;
    }
}

module.exports = { OrderDaoMongoDB }
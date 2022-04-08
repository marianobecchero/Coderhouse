const { MongoDBContainer } = require('../../persistence/containers/MongoDBContainer')

class CartDaoMongoDB extends MongoDBContainer {

    constructor() {
        super('carts', {
            //id: { type: Date, required: true },
            idUser: { type: String, required: true },
            products: { type: Array, required: true }
        })
        if (typeof CartDaoMongoDB.instance === 'object') {
            return CartDaoMongoDB.instance;
          }
          CartDaoMongoDB.instance = this;
          return this;
    }
}

module.exports = { CartDaoMongoDB }
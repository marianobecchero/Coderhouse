const { MongoDBContainer } = require('../../persistence/containers/MongoDBContainer')

class ProductDaoMongoDB extends MongoDBContainer {

    constructor() {
        super('products', {
            id: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true }
        })
        if (typeof ProductDaoMongoDB.instance === 'object') {
            return ProductDaoMongoDB.instance;
          }
          ProductDaoMongoDB.instance = this;
          return this;
    }
}

module.exports = { ProductDaoMongoDB }
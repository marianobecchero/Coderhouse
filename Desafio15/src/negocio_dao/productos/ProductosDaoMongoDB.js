const { ContenedorMongoDB } = require('../../persistence/containers/ContenedorMongoDB')

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('products', {
            id: { type: Date, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true }
        })
    }
}

module.exports = { ProductosDaoMongoDB }
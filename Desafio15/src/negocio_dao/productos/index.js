let ProductosDao

const execute = async() => {
    const { ProductosDaoMongoDB } = require('./ProductosDaoMongoDB.js')
    ProductosDao = new ProductosDaoMongoDB()
}
execute()

module.exports = { ProductosDao }
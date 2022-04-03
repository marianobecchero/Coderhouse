let ProductDao

const execute = async() => {
    const { ProductDaoMongoDB } = require('./products/ProductDaoMongoDB.js')
    ProductDao = new ProductDaoMongoDB()
}
execute()

module.exports = { ProductDao }
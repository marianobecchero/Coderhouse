let CartDao

const execute = async() => {
    const { CartDaoMongoDB } = require('./carts/CartDaoMongoDB.js')
    CartDao = new CartDaoMongoDB()
}
execute()

module.exports = { CartDao }
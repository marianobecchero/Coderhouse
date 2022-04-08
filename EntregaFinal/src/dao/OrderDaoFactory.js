let OrderDao

const execute = async() => {
    const { OrderDaoMongoDB } = require('./orders/OrderDaoMongoDB.js')
    OrderDao = new OrderDaoMongoDB()
}
execute()

module.exports = { OrderDao }
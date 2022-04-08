const { OrderDao } = require('../dao/OrderDaoFactory.js')
const { Order } = require('../business/Order')

class OrderController {
  constructor() {
    //this.product = new Product();
  }

  getOrdersByUser = async(idUser) => {
    const orders = await OrderDao.getOrdersByUser(idUser)
    return orders
  }

}

module.exports = { OrderController }
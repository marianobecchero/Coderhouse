const { OrderDao } = require('../dao/OrderDaoFactory.js')
const { Order } = require('../business/Order')

class OrderController {
  constructor() {
    //this.product = new Product();
  }

  getOrdersByUser = async(req, res) => {
    const idUser = req.params.idUser
    const orders = await OrderDao.getOrdersByUser(idUser)
    return res.status(200).json( orders )
  }

}

module.exports = { OrderController }
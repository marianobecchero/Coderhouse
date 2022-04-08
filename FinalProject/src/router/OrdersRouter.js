const { Router } = require('express')
const { auth } = require('./middlewares/jwt')
const { OrderController } = require('../controller/OrderController.js')

const orderController = new OrderController()

const OrdersRouter = Router()

/* --------- DATOS (AGREGA, QUITA Y COMPRA SI EL USUARIO ESTA REGISTRADO) ---------- */
OrdersRouter.get('/:idUser', auth, orderController.getOrdersByUser, (req, res) => {
})

exports.OrdersRouter = OrdersRouter;
const { Router } = require('express')
const { auth } = require('./middlewares/jwt')
const { OrderController } = require('../controller/OrderController.js')

const orderController = new OrderController()

const OrdersRouter = Router()

/* --------- DATOS (AGREGA, QUITA Y COMPRA SI EL USUARIO ESTA REGISTRADO) ---------- */
OrdersRouter.get('/:idUser', auth, (req, res) => {
    execute = async() => {
        const idUser = req.params.idUser
        const result = await orderController.getOrdersByUser(idUser)
        return res.status(200).json( result )
    }
    execute()
})

exports.OrdersRouter = OrdersRouter;
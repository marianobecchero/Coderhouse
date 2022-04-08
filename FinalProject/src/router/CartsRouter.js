const { Router } = require('express')
const { auth } = require('./middlewares/jwt')
const { CartController } = require('../controller/CartController.js')

const cartController = new CartController()

const CartsRouter = Router()

/* --------- DATOS (AGREGA, QUITA Y COMPRA SI EL USUARIO ESTA REGISTRADO) ---------- */
CartsRouter.post('/:idCart/products/:idProduct', auth, cartController.addProduct, (req, res) => {
})

CartsRouter.delete('/:idCart/products/:idProduct', auth, cartController.deleteProduct, (req, res) => {
})

CartsRouter.post('/:idCart', auth, cartController.buy, (req, res) => {
})

exports.CartsRouter = CartsRouter;
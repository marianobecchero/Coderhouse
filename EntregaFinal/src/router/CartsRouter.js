const { Router } = require('express')
const { auth } = require('./middlewares/jwt')
const { CartController } = require('../controller/CartController.js')

const cartController = new CartController()

const CartsRouter = Router()

/* --------- DATOS (AGREGA, QUITA Y COMPRA SI EL USUARIO ESTA REGISTRADO) ---------- */
CartsRouter.post('/:idCart/products/:idProduct', auth, (req, res) => {
    execute = async() => {
        const idCart = req.params.idCart
        const idProduct = req.params.idProduct
        const result = await cartController.addProduct(idCart, idProduct)
        return res.status(200).json( result )
    }
    execute()
})

CartsRouter.delete('/:idCart/products/:idProduct', auth, (req, res) => {
    execute = async() => {
        const idCart = req.params.idCart
        const idProduct = req.params.idProduct
        const result = await cartController.deleteProduct(idCart, idProduct)
        return res.status(200).json( result )
    }
    execute()
})

/*CartsRouter.get('/getAll', (req, res) => {
    execute = async() => {
        const result = await productController.getAllProducts()
        return res.status(200).json( result )
    }
    execute()
})

CartsRouter.put('/', authAdmin, (req, res) => {
    execute = async() => {
        const { id, title, description, price, photoURL } = req.body
        const result = await productController.updateProduct(id, title, description, price, photoURL)
        return res.status(200).json( result )
    }
    execute()
})*/

exports.CartsRouter = CartsRouter;
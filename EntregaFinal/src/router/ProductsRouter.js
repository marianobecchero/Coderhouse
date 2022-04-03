const { Router } = require('express')
const { authAdmin } = require('./middlewares/jwt')
const { ProductController } = require('../controller/ProductController.js')

const productController = new ProductController()

const ProductsRouter = Router()

/* --------- DATOS (CREAR, BORRAR Y MODIFICAR PRODUCTOS SOLO USUARIOS ADMIN) ---------- */
ProductsRouter.post('/', authAdmin, (req, res) => {
    execute = async() => {
        const { title, description, price, photoURL } = req.body
        const result = await productController.createProduct(title, description, price, photoURL)
        return res.status(200).json( result )
    }
    execute()
})

ProductsRouter.delete('/', authAdmin, (req, res) => {
    execute = async() => {
        const id = req.body.id
        const result = await productController.deleteProduct(id)
        return res.status(200).json( result )
    }
    execute()
})

ProductsRouter.put('/', authAdmin, (req, res) => {
    execute = async() => {
        const { id, title, description, price, photoURL } = req.body
        const result = await productController.updateProduct(id, title, description, price, photoURL)
        return res.status(200).json( result )
    }
    execute()
})


/* --------- DATOS (VER PRODUCTOS TODOS LOS USUARIOS, INCLUIDOS LOS QUE NO ESTAN REGISTRADOS) ---------- */
ProductsRouter.get('/getAll', (req, res) => {
    execute = async() => {
        const result = await productController.getAllProducts()
        return res.status(200).json( result )
    }
    execute()
})

exports.ProductsRouter = ProductsRouter;
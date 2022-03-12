const { Router } = require('express')
const { ProductController } = require('../controller/ProductController.js')

const ProductRouter = Router()

const productController = new ProductController()

ProductRouter.get('/getAllProducts', (req, res) => {
    const products = async() => {
        const products = await productController.getAllProducts()
        res.json(products) 
    }
    products()
})

ProductRouter.post('/createProduct'), (req, res) => {
    const { id, title, price, thumbnail } = req.body
    const newProduct = new Product(id, title, price, thumbnail)
    const create = async() => {
        const product = await productController.createProduct(newProduct)
        res.json(product)
    }
    create()
}

exports.ProductRouter = ProductRouter;
const { Router } = require('express')
const { authAdmin } = require('./middlewares/jwt')
const { upload } = require('./middlewares/multer')
const { ProductController } = require('../controller/ProductController.js')

const productController = new ProductController()

const ProductsRouter = Router()

/* --------- DATOS (CREAR, BORRAR Y MODIFICAR PRODUCTOS SOLO USUARIOS ADMIN) ---------- */
ProductsRouter.post('/', authAdmin, productController.createProduct, (req, res) => {
})

ProductsRouter.delete('/:idProduct', authAdmin, productController.deleteProduct, (req, res) => {
})

ProductsRouter.put('/:idProduct', authAdmin, productController.updateProduct, (req, res) => {
})


/* --------- DATOS (VER PRODUCTOS TODOS LOS USUARIOS, INCLUIDOS LOS QUE NO ESTAN REGISTRADOS) ---------- */
ProductsRouter.get('/', productController.getAllProducts, (req, res) => {
})

/*----------- SUBO LA IMAGEN ----------------*/
ProductsRouter.post('/upload/:idProduct', auth, upload.single('myFile'), productController.upload, (req, res) => {
})

exports.ProductsRouter = ProductsRouter;
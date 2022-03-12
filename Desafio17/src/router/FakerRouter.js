const { Router } = require('express')
const { generarNProductos } = require('../controller/fakerController.js')


const FakerRouter = Router()

FakerRouter.get('/', generarNProductos, (req, res) => {
})

exports.FakerRouter = FakerRouter;
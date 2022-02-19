const { Router } = require('express')
const { generarNProductos } = require('../controller/faker.js')


const FakerRouter = Router()

FakerRouter.get('/', generarNProductos, (req, res) => {
})

exports.FakerRouter = FakerRouter;
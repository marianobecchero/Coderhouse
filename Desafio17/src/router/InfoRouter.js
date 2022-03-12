const { Router } = require('express')
const { getInfo, numCPU } = require('../controller/infoController.js')

const InfoRouter = Router()

/*InfoRouter.get('/', numCPU, (req, res) => {
})*/

InfoRouter.get('/', getInfo, (req, res) => {
})

exports.InfoRouter = InfoRouter;
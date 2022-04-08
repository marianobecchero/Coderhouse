const { Router } = require('express')
const { getInfo } = require('../controller/InfoController.js')

const InfoRouter = Router()

InfoRouter.get('/', getInfo, (req, res) => {
})

exports.InfoRouter = InfoRouter;
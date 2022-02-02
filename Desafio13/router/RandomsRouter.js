const express = require('express')
const path = require('path')
const { fork } = require('child_process')
const { logger } = require('../logger.js')

const { Router } = express;
const RandomsRouter = new Router();

let cantidad

RandomsRouter.get('/', (req, res) => {
    const { originalUrl, method } = req
    logger.info(`Ruta ${method} ${originalUrl} OK`)
    if (req.query.cant == undefined) {
        cantidad = 100000000
    } else {
        cantidad = req.query.cant
    }
    const computo = fork(path.resolve(process.cwd(), 'computo.js'))

    //computo.send('start');
    computo.on('message', resultado => {
    if (resultado == 'listo') {
      computo.send(cantidad);
    } else {
      res.json({ resultado });
    }
  })
});

exports.RandomsRouter = RandomsRouter;
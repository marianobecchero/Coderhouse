/*const { fork } = require('child_process')
const path = require('path')
const { Router } = require('express')

const RandomsRouter = Router()

RandomsRouter.get('/', (req, res) => {
    const cantidad = req.query.cant 
                        ? req.query.cant
                        : 100000000;
    const computo = fork(path.resolve(process.cwd() + '/forks/computo.js'));
    computo.send('start');
    computo.on('message', (resultado) => {
      console.log(resultado);
      if (resultado == 'listo') {
        console.log('Enviamos señal');
        computo.send(cantidad);
      } else {
        console.log(`Mensaje del hijo: ${resultado}`);
        res.json({ resultado });
      }
    });
  });*/
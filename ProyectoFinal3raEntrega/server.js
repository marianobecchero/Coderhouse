const express = require('express')
const { productosRouter } = require('./router/ProductosRouter.js')
const { carritosRouter } = require('./router/CarritosRouter.js')
const { sesionesRouter } = require('./router/SesionesRouter.js')
require('dotenv').config()
const cluster = require('cluster')
const { logger } = require('./logger.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)
app.use('/', sesionesRouter)

/*app.all('*', (req, res) => {
    res.json({ error : -2, descripcion: `ruta '${req.url}' método ${req.method} no implementada`})
})*/

const numCPUs = require('os').cpus().length

const PORT = 8080

function serverFork(){
    const server = app.listen(PORT, () => {
        logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))
}

function serverCluster(){
    /* MASTER */
    if (cluster.isMaster) {
        //logger.info(numCPUs)
        //console.log(`PID MASTER ${process.pid}`)

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', worker => {
            //console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork()
        })
    }
    /* WORKERS */
    else {
        serverFork()
    }
}

if (process.env.MODO == 'fork'){
    serverFork()
} else {
    serverCluster()
}
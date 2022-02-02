const { Router } = require('express')

const InfoRouter = Router()

const numCPUs = require('os').cpus().length

InfoRouter.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/info.html')
})

InfoRouter.get('/getInfo', (req, res) => {
    const info = {
        argumentosEntrada: process.argv,
        nombrePlataforma: process.env.OS,
        versionNodeJS: process.version,
        memoriaTotalReservada: process.memoryUsage().rss,
        pathEjecucion: process.env.PWD,
        processId: process.pid,
        carpetaProyecto: process.cwd(),
        numeroProcesadores: numCPUs
    }
    res.send(info)
})

exports.InfoRouter = InfoRouter;
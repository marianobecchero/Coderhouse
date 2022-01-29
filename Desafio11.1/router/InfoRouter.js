const { Router } = require('express')

const InfoRouter = Router()


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
        carpetaProyecto: process.cwd()
    }
    res.send(info)
})

exports.InfoRouter = InfoRouter;
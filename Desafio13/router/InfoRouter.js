const { Router } = require('express')
const compression = require('compression')
const { logger } = require('../logger.js')
const { fork } = require('child_process')

const InfoRouter = Router()

InfoRouter.get('/', (req, res) => {
    const { originalUrl, method } = req
    logger.info(`Ruta ${method} ${originalUrl} OK`)
    res.sendFile(process.cwd() + '/public/info.html')
})

/*let version
fork('node -v', (err, stdout, stderr) => { 
    if(err){
        console.log(err)
        return
    }
    if(stderr){
        console.log(stderr)
        return
    }
    version = stdout.replace('\n','')
    // console.log(stdout)
})*/


InfoRouter.get('/getInfo', compression(), (req, res) => {
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
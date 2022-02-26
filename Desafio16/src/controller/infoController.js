const numCPUs = require('os').cpus().length

function numCPU(req, res, next){
    res.sendFile(process.cwd() + '/public/info.html')
}

function getInfo(req, res, next) {
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
}

module.exports = {numCPU, getInfo}
const numCPUs = require('os').cpus().length

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
    res.render('datos.hbs', {info})
}

module.exports = {getInfo}
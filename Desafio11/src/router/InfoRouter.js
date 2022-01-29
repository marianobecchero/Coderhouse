const { Router } = require('express')

const InfoRouter = Router()

InfoRouter.get('/', (req, res) => {
    const info = {
        ArgumentosEntrada: process.argv,
        PathEjecucion: process.env.PWD,
        NombrePlataforma: process.env.OS,
        ProcessId: process.pid,
        VersionNode: version,
        CarpetaProyecto: process.cwd(),
        MemoriaTotalReservada: process.memoryUsage(),
    }
    res.json({ info })
})

exports.InfoRouter = InfoRouter;
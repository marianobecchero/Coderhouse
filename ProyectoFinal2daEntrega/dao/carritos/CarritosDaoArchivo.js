const { ContenedorArchivo } = require ("../../contenedor/ContenedorArchivo.js")

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/carritos.json`)
    }
}

module.exports = { CarritosDaoArchivo }
const { ContenedorArchivo } = require ("../../contenedor/ContenedorArchivo.js")

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/productos.json`)
    }
}

module.exports = { ProductosDaoArchivo }
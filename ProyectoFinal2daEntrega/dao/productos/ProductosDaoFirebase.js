//import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"
const { ContenedorFirebase } = require('../../contenedor/ContenedorFirebase.js')

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos')
    }
}

module.exports = { ProductosDaoFirebase }
const { ContenedorFirebase } = require('../../contenedor/ContenedorFirebase.js')

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }
}

module.exports = { CarritosDaoFirebase }
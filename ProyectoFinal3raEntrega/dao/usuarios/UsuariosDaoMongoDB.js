const { ContenedorMongoDB } = require('../../contenedor/ContenedorMongoDB.js')

class UsuariosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('usuarios', {
            id: { type: Number, required: true },
            username: { type: String, required: true },
            password: { type: String, required: true },
            nombre: { type: String, required: true },
            direccion: { type: String, required: true },
            edad: { type: Number, required: true },
            nroTelefono: { type: String, required: true }
        })
    }
}

module.exports = { UsuariosDaoMongoDB }
const { ContenedorMongoDB } = require('../../options/ContenedorMongoDB.js')

class UsuariosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('usuarios', {
            id: { type: Date, required: true },
            username: { type: String, required: true },
            password: { type: String, required: true }
        })
    }
}

module.exports = { UsuariosDaoMongoDB }
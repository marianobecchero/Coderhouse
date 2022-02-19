const { ContenedorMongoDB } = require('../../persistence/containers/ContenedorMongoDB')

class UsuariosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('users', {
            id: { type: Date, required: true },
            username: { type: String, required: true },
            password: { type: String, required: true }
        })
    }
}

module.exports = { UsuariosDaoMongoDB }
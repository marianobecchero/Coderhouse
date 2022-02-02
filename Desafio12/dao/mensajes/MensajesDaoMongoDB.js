const { ContenedorMongoDB } = require('../../options/ContenedorMongoDB.js')

class MensajesDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        /*super('mensajes', {
            author: {
                id: { type: String, required: true },
                nombre: { type: String, required: true },
                apellido: { type: String, required: true },
                edad: { type: String, required: true },
                alias: { type: String, required: true },
                avatar: { type: String, required: true }
            },
            mensaje: { type: String, required: true },
            fecha: { type: String, required: true },
            id: { type: Number, require: true }
        })*/
        super('mensajes', {
            id: { type: String, required: true },
            email: { type: String, required: true },
            nombre: { type: String, required: true },
            apellido: { type: String, required: true },
            edad: { type: Number, required: true },
            alias: { type: String, required: true },
            avatar: { type: String, required: true },
            mensaje: { type: String, required: true },
            fecha: { type: String, required: true }
        })
    }
}

module.exports = { MensajesDaoMongoDB }
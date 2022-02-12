//import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"
const { ContenedorMongoDB } = require('../../contenedor/ContenedorMongoDB.js')

class CarritosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('carritos', {
            productos: { type: Object, required: true },
            id: { type: Number, required: true },
            timestamp: { type: Date, required: true }
        })
    }
}

module.exports = { CarritosDaoMongoDB }
//export default PersonasDaoMongoDb
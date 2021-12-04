//import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"
const { ContenedorMongoDB } = require('../../contenedor/ContenedorMongoDB.js')

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('productos', {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            precio: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            codigo: { type: String, required: true },
            stock: { type: Number, required: true },
            id: { type: Number, required: true },
            timestamp: { type: Date, required: true }
        })
    }
}

module.exports = { ProductosDaoMongoDB }
//export default PersonasDaoMongoDb
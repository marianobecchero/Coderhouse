//import config from '../../config.js'
const { config } = require('../../config.js')

let productosDao

const execute = async() => {
    switch (config.PERS) {
        case 'json':
            const { ProductosDaoArchivo } = require('./ProductosDaoArchivo.js')
            productosDao = new ProductosDaoArchivo(config.fileSystem.path)
            break
        case 'firebase':
            const { ProductosDaoFirebase } = require('./ProductosDaoFirebase.js')
            productosDao = new ProductosDaoFirebase()
            break
        case 'mongodb':
            const { ProductosDaoMongoDB } = require('./ProductosDaoMongoDB.js')
            productosDao = new ProductosDaoMongoDB()
            break
        default:
            const { ProductosDaoMemoria } = require('./ProductosDaoMemoria.js')
            productosDao = new ProductosDaoMemoria()
            break
    }
}
execute()

module.exports = { productosDao }



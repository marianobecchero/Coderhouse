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
            const { default: ProductosDaoFirebase } = await import('./ProductosDaoFirebase.js')
            productosDao = new ProductosDaoFirebase()
            break
        case 'mongodb':
            const { default: ProductosDaoMongoDb } = await import('./ProductosDaoMongoDb.js')
            productosDao = new ProductosDaoMongoDb()
            break
        default:
            const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
            productosDao = new ProductosDaoMem()
            break
    }
}
execute()

module.exports = { productosDao }



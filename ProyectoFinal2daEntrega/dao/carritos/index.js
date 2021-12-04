//import config from '../../config.js'
const { config } = require('../../config.js')

let carritosDao

const execute = async() => {
    switch (config.PERS) {
        case 'json':
            const { CarritosDaoArchivo } = require('./CarritosDaoArchivo.js')
            carritosDao = new CarritosDaoArchivo(config.fileSystem.path)
            break
        case 'firebase':
            const { CarritosDaoFirebase } = require('./CarritosDaoFirebase.js')
            carritosDao = new CarritosDaoFirebase()
            break
        case 'mongodb':
            const { CarritosDaoMongoDB } = require('./CarritosDaoMongoDB.js')
            carritosDao = new CarritosDaoMongoDB()
            break
        default:
            const { CarritosDaoMemoria } = require('./CarritosDaoMemoria.js')
            carritosDao = new CarritosDaoMemoria()
            break
    }
}
execute()

module.exports = { carritosDao }
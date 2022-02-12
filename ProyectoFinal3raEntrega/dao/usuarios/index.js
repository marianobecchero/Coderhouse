const { config } = require('../../config.js')

let usuariosDao

const execute = async() => {
    const { UsuariosDaoMongoDB } = require('./UsuariosDaoMongoDB.js')
    usuariosDao = new UsuariosDaoMongoDB()
}
execute()

module.exports = { usuariosDao }
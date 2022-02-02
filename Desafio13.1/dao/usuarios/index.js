let UsuariosDao

const execute = async() => {
    const { UsuariosDaoMongoDB } = require('./UsuariosDaoMongoDB.js')
    UsuariosDao = new UsuariosDaoMongoDB()
}
execute()

module.exports = { UsuariosDao }
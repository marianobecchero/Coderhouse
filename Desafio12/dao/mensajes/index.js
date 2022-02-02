let MensajesDao

const execute = async() => {
    const { MensajesDaoMongoDB } = require('./MensajesDaoMongoDB.js')
    MensajesDao = new MensajesDaoMongoDB()
}
execute()

module.exports = { MensajesDao }
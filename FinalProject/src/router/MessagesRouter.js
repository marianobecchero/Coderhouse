const { MessageController } = require('../controller/MessageController.js')

const messageController = new MessageController()

class MessagesRouter {
    constructor(io) {
      this.io = io;
    }
  
    startRouter = async () => {
      this.io.on('connection', async (socket) => {
        const messages = await messageController.getAllMessages()
        socket.emit('messages', messages)

        // agregar producto
        socket.on('add', message => {
            //productos.push(producto)
            const insertMessage = async() => {
                //await sqlProductos.insertar(producto)
                await messageController.newMessage(message)
            }
            insertMessage()
            this.io.sockets.emit('messages', messages);
        })
      });
    };
  }
  
  module.exports = { MessagesRouter };
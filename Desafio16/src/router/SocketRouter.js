//const { MensajesDao } = require('../dao/mensajes/index')
//const { ProductosDao } = require('../negocio_dao/productos/index')
const { ProductController } = require('../controller/ProductController.js')
const { MessageController } = require('../controller/MessageController.js')
const { normalization } = require('./middlewares/normalization.js')

const productController = new ProductController()
const messageController = new MessageController()

class SocketRouter {
    constructor(io) {
      this.io = io;
    }
  
    startRouter = async () => {
      this.io.on('connection', async (socket) => {
        //console.log('Nuevo cliente conectado!');
        const productos = await productController.getAllProducts()
        socket.emit('productos', productos)

        // agregar producto
        socket.on('add', producto => {
            //console.log(producto)
            productos.push(producto)
            const insertarProducto = async() => {
                //await sqlProductos.insertar(producto)
                await productController.createProduct(producto)
            }
            insertarProducto()
            this.io.sockets.emit('productos', productos);
        })


        const mensajes = await messageController.getAllMessages()
        let mensajesNormalizados = await normalization(mensajes)
        socket.emit('mensajes', mensajesNormalizados)

        //agregar mensajes
        socket.on('nuevoMensaje', mensaje => {
            const insertarMensaje = async() => {
                await messageController.createMessage(mensaje)
                const mensajes = await messageController.getAllMessages()
                let mensajesNormalizados = await normalization(mensajes)
                this.io.sockets.emit('mensajes', mensajesNormalizados);
            }
            insertarMensaje()
            
        })
      });
    };
  }
  
  module.exports = { SocketRouter };
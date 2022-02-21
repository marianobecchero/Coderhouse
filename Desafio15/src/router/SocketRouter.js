const { MensajesDao } = require('../negocio_dao/mensajes/index')
const { ProductosDao } = require('../negocio_dao/productos/index')

class SocketRouter {
    constructor(io) {
      this.io = io;
    }
  
    startRouter = async () => {
      this.io.on('connection', async (socket) => {
        //console.log('Nuevo cliente conectado!');
        const productos = await ProductosDao.getAll()
        socket.emit('productos', productos)

        // agregar producto
        socket.on('add', producto => {
            //console.log(producto)
            productos.push(producto)
            const insertarProducto = async() => {
                //await sqlProductos.insertar(producto)
                await ProductosDao.save(producto)
            }
            insertarProducto()
            this.io.sockets.emit('productos', productos);
        })


        const mensajes = await MensajesDao.getAll()
        socket.emit('mensajes', mensajes)

        //agregar mensajes
        socket.on('nuevoMensaje', mensaje => {
            mensajes.push(mensaje)
            const insertarMensaje = async() => {
                await MensajesDao.save(mensaje)
            }
            insertarMensaje()
            this.io.sockets.emit('mensajes', mensajes);
        })
      });
    };
  }
  
  module.exports = { SocketRouter };
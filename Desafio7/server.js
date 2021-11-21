const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io');
//const {Contenedor} = require('./Contenedor')
//const { getMensajes, saveMensaje } = require('./models/mensajes');
const { ClienteSql } = require('./ContenedorSqlKnex.js')
const { optionsMySQL } = require('./options/mysql.js')
const { optionsSQLite3 } = require('./options/SQLite3.js')

const app = express();
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)

//const contenedor = new Contenedor("Productos.txt");
const sqlProductos = new ClienteSql(optionsMySQL, 'productos')
const sqlMensajes = new ClienteSql(optionsSQLite3, 'mensajes')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    
    const servidorProductos = async() =>{
        //Carga inicial de productos
        const productos = []
        const registros = await sqlProductos.listarTodos()
        for (const registro of registros){
            const producto = {
                id: registro['id'],
                title: registro['title'],
                price: registro['price'],
                thumbnail: registro['thumbnail']
            }
            productos.push(producto)
        }
        socket.emit('productos', productos)

        // agregar producto
        socket.on('add', producto => {
            productos.push(producto)
            const insertarProducto = async() => {
                await sqlProductos.insertar(producto)
            }
            insertarProducto()
            io.sockets.emit('productos', productos);
        })

    }
    servidorProductos()


    const servidorMensajes = async() => {
        //carga inicial de mensajes
        const mensajes = []
        sqlMensajes.crearTablaMensajes()
        const registros = await sqlMensajes.listarTodos()
        for (const registro of registros){
            const mensaje = {
                email: registro['email'],
                fecha: registro['fecha'],
                mensaje: registro['mensaje']
            }
            mensajes.push(mensaje)
        }
        socket.emit('mensajes', mensajes)


        //agregar mensajes
        socket.on('nuevoMensaje', mensaje => {
            mensajes.push(mensaje)
            const insertarMensaje = async() => {
                await sqlMensajes.insertar(mensaje)
            }
            insertarMensaje()
            io.sockets.emit('mensajes', mensajes);
        })




        /*socket.on('nuevoMensaje', mensaje => {
            saveMensaje(mensaje)
        
            const allMessages = getMensajes();
            io.sockets.emit('mensajes', allMessages)
        })*/
    }
    servidorMensajes()
    

    

    
        
        
    
    


    
})



const PORT = 8080

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
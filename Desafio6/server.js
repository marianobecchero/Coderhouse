const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io');
//const { routerProductos } = require("./router/productos")
const {Contenedor} = require('./Contenedor')
const { getMensajes, saveMensaje } = require('./models/mensajes');


const app = express();
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)

const contenedor = new Contenedor("Productos.txt");

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    

    //const productos = getMessages()
    /*const productos = [{
            title: 'Manzana',
            price: 123,
            thumbnail: 'dsfdsfsdf'
        },
        {
            title: 'Pera',
            price: 85,
            thumbnail: 'sdasda'
        }
        ]*/



    //socket.emit('productos', routerProductos)

    /*socket.on('new-message', message => {
        saveMessage(message)

        const allMessages = getMessages();
        io.sockets.emit('messages', allMessages)
     })*/


    
    const servidorProductos = async() =>{
        // carga inicial de productos
        const productos = await contenedor.getAll()
        socket.emit('productos', productos)

        // agregar producto
        socket.on('add', producto => {
            productos.push(producto)
            const agregarProducto = async() => {
                await contenedor.save(producto)
            }
            agregarProducto()
            io.sockets.emit('productos', productos);
        })

    }
    servidorProductos()

    //carga inicial de mensajes
    const mensajes = getMensajes()
    socket.emit('mensajes', mensajes)

    //agregar mensajes
    socket.on('nuevoMensaje', mensaje => {
        saveMensaje(mensaje)
    
        const allMessages = getMensajes();
        io.sockets.emit('mensajes', allMessages)
    })
        
        
    
    


    
})

/* Cargo los routers */
//app.use('/api/productos', routerProductos)


const PORT = 8080

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io');
const { routerProductos } = require("./router/productos")
//const exphbs = require('express-handlebars')

const app = express();
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)

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
    /* Cargo los routers */

    //socket.emit('productos', routerProductos)

    /*socket.on('new-message', message => {
        saveMessage(message)

        const allMessages = getMessages();
        io.sockets.emit('messages', allMessages)
     })*/
})

/*app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'listaProductos.hbs'
}))
  
app.set('views', './views')*/

/* Cargo los routers */
app.use('/api/productos', routerProductos)


const PORT = 8080

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
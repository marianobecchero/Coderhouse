const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io');
const { ClienteSql } = require('./ContenedorSqlKnex.js')
const { optionsMySQL } = require('./options/mysql.js')
const { optionsSQLite3 } = require('./options/SQLite3.js')
const { ContenedorArchivo } = require('./options/ContenedorArchivo.js')
const faker = require('faker')
faker.locale = 'es'
const { normalize, schema } = require("normalizr");
const util = require('util')

const app = express();
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)

const sqlProductos = new ClienteSql(optionsMySQL, 'productos')
const sqlMensajes = new ClienteSql(optionsSQLite3, 'mensajes')
const contenedorArchivo = new ContenedorArchivo("./DB/mensajes.json");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


// Definimos esquemas
const authorSchema = new schema.Entity('author');

const messageSchema = new schema.Entity('messages', {
  author: authorSchema,
});

const arrMessage = [messageSchema];

async function normalization(arrData) {
    const normalizedData = normalize(arrData, arrMessage);
    console.log(util.inspect(normalizedData, false, 12, true));
    return normalizedData;
  }

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    
    const servidorProductos = async() =>{
        //Carga inicial de productos
        const productos = []
        await sqlProductos.crearTablaProductos()
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
        const mensajes = await contenedorArchivo.getAll()
        let normalizedMessages = await normalization(mensajes);
        
        console.log('Longitud objeto original: ', JSON.stringify(mensajes).length)
        console.log('Longitud objeto normalizado: ', JSON.stringify(normalizedMessages).length)
        socket.emit('mensajes', normalizedMessages)


        //agregar mensajes
        socket.on('nuevoMensaje', mensaje => {
            const insertarMensaje = async() => {
                await contenedorArchivo.save(mensaje)
            }
            insertarMensaje()
            io.sockets.emit('mensajes', normalizedMessages);
        })
    }
    servidorMensajes()
    
})

//--------------------Faker------------------------------
function crearCombinacionAlAzar() {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

function generarNProductos(cant) {
    const productos = []
    for (let i = 0; i < cant; i++) {
        productos.push(crearCombinacionAlAzar())
    }
    return productos
}

const CANT_PROD_DEFAULT = 5

app.get('/api/productos-test', (req, res) => {
    const cant = CANT_PROD_DEFAULT
    res.json(generarNProductos(cant))
})



const PORT = 8080

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
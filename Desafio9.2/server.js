const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io');
//const {Contenedor} = require('./Contenedor')
//const { getMensajes, saveMensaje } = require('./models/mensajes');
const { ClienteSql } = require('./ContenedorSqlKnex.js')
const { optionsMySQL } = require('./options/mysql.js')
const { optionsSQLite3 } = require('./options/SQLite3.js')
const { ContenedorArchivo } = require('./options/ContenedorArchivo.js')
const faker = require('faker')
faker.locale = 'es'
const { normalize, schema } = require("normalizr");
//const { util } = require('util')

const app = express();
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)

//const contenedor = new Contenedor("Productos.txt");
const sqlProductos = new ClienteSql(optionsMySQL, 'productos')
const sqlMensajes = new ClienteSql(optionsSQLite3, 'mensajes')
const contenedorArchivo = new ContenedorArchivo("mensajes.json");

// Definimos esquemas
/*const author = new schema.Entity('author');

const authorSchema = { aut: [author], idAttributte: 'email'}*/


const schemaAuthor = new schema.Entity('authors', {}, { idAttribute: 'email' });
  const schemaMensaje = new schema.Entity('mensajes', {
    author: schemaAuthor
  });


  const esquemaChat = new schema.Entity('chat', {
    originalMensajes: [schemaMensaje],
  });



//let arrMensajes = [message]

const normalizacion = async(objMsj) => {
    const datosNormalizados = normalize(objMsj, esquemaChat);
    return datosNormalizados;
}

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))



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


    /*const servidorMensajes = async() => {
        //carga inicial de mensajes
        const mensajes = []
        await sqlMensajes.crearTablaMensajes()
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
    }
    servidorMensajes()*/

    const servidorMensajes = async() => {
        
        //carga inicial de mensajes
        const mensajes = await contenedorArchivo.getAll()
        const objetoMensajes = { id: 'idMensajes', originalMensajes: mensajes }
        //console.log(objetoMensajes)
        let mensajesNormalizados = await normalizacion(objetoMensajes);
        console.log(mensajesNormalizados)
        console.log('Longitud objeto original: ', JSON.stringify(mensajes).length)
        console.log('Longitud objeto normalizado: ', JSON.stringify(mensajesNormalizados).length)
        socket.emit('mensajes', mensajesNormalizados)


        //agregar mensajes
        socket.on('nuevoMensaje', mensaje => {
            const insertarMensaje = async() => {
                await contenedorArchivo.save(mensaje)
            }
            insertarMensaje()
            io.sockets.emit('mensajes', mensajesNormalizados);
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
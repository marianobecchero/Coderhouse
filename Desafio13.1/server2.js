const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io');
const { ClienteSql } = require('./ContenedorSqlKnex.js')
const { optionsMySQL } = require('./options/mysql.js')
const faker = require('faker')
faker.locale = 'es'
const { normalize, schema } = require("normalizr");
const util = require('util')
const { SesionesRouter } = require('./router/SesionesRouter.js')
const { InfoRouter } = require('./router/InfoRouter.js')
const { RandomsRouter } = require('./router/RandomsRouter.js')
const { engine } = require('express-handlebars')
const { MensajesDao } = require('./dao/mensajes/index')
const parseArgs = require('minimist')
//const { logger } = require('./logger.js')

const app = express();
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)

const sqlProductos = new ClienteSql(optionsMySQL, 'productos')
//1 const contenedorArchivo = new ContenedorArchivo("./DB/mensajes.json");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
//app.use('/api/sesiones', SesionesRouter)
app.use('/Info', InfoRouter)
app.use('/Randoms', RandomsRouter)
app.use('/', SesionesRouter)

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main.hbs' }))
app.set('view engine', '.hbs')


// Definimos esquemas
/*2 const authorSchema = new schema.Entity('author');

const messageSchema = new schema.Entity('messages', {
  author: authorSchema,
});

const arrMessage = [messageSchema];

async function normalization(arrData) {
    const normalizedData = normalize(arrData, arrMessage);
    //console.log(util.inspect(normalizedData, false, 12, true));
    return normalizedData;
  }*/


const options = {
    alias: {
        p: 'puerto'
    },
    default: {
        puerto: 8080
    }
}

const commandLineArgs = process.argv.slice(2);

const { puerto, _ } = parseArgs(commandLineArgs, options);

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
        const mensajes = await MensajesDao.getAll()
        //3 let normalizedMessages = await normalization(mensajes);
        
        //console.log('Longitud objeto original: ', JSON.stringify(mensajes).length)
        //console.log('Longitud objeto normalizado: ', JSON.stringify(normalizedMessages).length)
        //4 socket.emit('mensajes', normalizedMessages)
        socket.emit('mensajes', mensajes)

        //agregar mensajes
        socket.on('nuevoMensaje', mensaje => {
            mensajes.push(mensaje)
            const insertarMensaje = async() => {
                await MensajesDao.save(mensaje)
            }
            insertarMensaje()
            //5 io.sockets.emit('mensajes', normalizedMessages);
            io.sockets.emit('mensajes', mensajes);
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

const PORT = puerto

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
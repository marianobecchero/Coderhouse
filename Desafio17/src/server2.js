const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io');
const { ClienteSql } = require('./persistence/containers/ContenedorSqlKnex.js')
const { optionsMySQL } = require('./persistence/containers/mysql.js')
const { normalize, schema } = require("normalizr");
const util = require('util')
const { SesionesRouter } = require('./router/SesionesRouter.js')
const { InfoRouter } = require('./router/InfoRouter.js')
const { RandomsRouter } = require('./router/RandomsRouter.js')
const { FakerRouter } = require('./router/FakerRouter.js')
const { SocketRouter } = require('./router/SocketRouter.js')
const { ProductRouter } = require('./router/ProductRouter.js')
const { engine } = require('express-handlebars')
//const { MensajesDao } = require('./negocio_dao/mensajes/index')
//const { ProductosDao } = require('./negocio_dao/productos/index')
const parseArgs = require('minimist')
const cluster = require('cluster')

const app = express();
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)
const socketRouter = new SocketRouter(io);
socketRouter.startRouter();

const sqlProductos = new ClienteSql(optionsMySQL, 'productos')
//1 const contenedorArchivo = new ContenedorArchivo("./DB/mensajes.json");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
//app.use('/api/sesiones', SesionesRouter)
app.use('/Info', InfoRouter)
app.use('/Randoms', RandomsRouter)
app.use('/api/productos-test', FakerRouter)
app.use('/api/productos', ProductRouter)
app.use('/', SesionesRouter)

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main.hbs' }))
app.set('views', __dirname + '/views')
app.set('view engine', '.hbs')

const numCPUs = require('os').cpus().length


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
        p: 'puerto',
        m: 'modo'
    },
    default: {
        puerto: 8080,
        modo: 'fork'
    }
}

const commandLineArgs = process.argv.slice(2);

const { puerto, modo, _ } = parseArgs(commandLineArgs, options);

// io.on('connection', socket => {
    
//     const servidorProductos = async() =>{
//         //Carga inicial de productos
//         //const productos = []
//         //await sqlProductos.crearTablaProductos()
//         //const registros = await sqlProductos.listarTodos()
//         const productos = await ProductosDao.getAll()
//         /*console.log(productos)
//         for (const registro of productos){
//             const producto = {
//                 id: registro['id'],
//                 title: registro['title'],
//                 price: registro['price'],
//                 thumbnail: registro['thumbnail']
//             }
//             productos.push(producto)
//         }*/
//         socket.emit('productos', productos)

//         // agregar producto
//         socket.on('add', producto => {
//             //console.log(producto)
//             productos.push(producto)
//             const insertarProducto = async() => {
//                 //await sqlProductos.insertar(producto)
//                 await ProductosDao.save(producto)
//             }
//             insertarProducto()
//             io.sockets.emit('productos', productos);
//         })

//     }
//     servidorProductos()

//     const servidorMensajes = async() => {
//         //carga inicial de mensajes
//         const mensajes = await MensajesDao.getAll()
//         //3 let normalizedMessages = await normalization(mensajes);
        
//         //console.log('Longitud objeto original: ', JSON.stringify(mensajes).length)
//         //console.log('Longitud objeto normalizado: ', JSON.stringify(normalizedMessages).length)
//         //4 socket.emit('mensajes', normalizedMessages)
//         socket.emit('mensajes', mensajes)

//         //agregar mensajes
//         socket.on('nuevoMensaje', mensaje => {
//             mensajes.push(mensaje)
//             const insertarMensaje = async() => {
//                 await MensajesDao.save(mensaje)
//             }
//             insertarMensaje()
//             //5 io.sockets.emit('mensajes', normalizedMessages);
//             io.sockets.emit('mensajes', mensajes);
//         })
        
        
//     }
//     servidorMensajes()
    
// })

const PORT = process.env.PORT || 8080

serverFork()

function serverFork(){
    const server = httpServer.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
        //console.log(`Servidor express en ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))    
}

//

function serverCluster(){
    /* --------------------------------------------------------------------------- */
    /* MASTER */
    if (cluster.isMaster) {
        console.log(numCPUs)
        console.log(`PID MASTER ${process.pid}`)

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', worker => {
            console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork()
        })
    }
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    else {
        serverFork()
    }
}

/*if (modo == 'fork'){
    serverFork()
} else {
    serverCluster()
}*/


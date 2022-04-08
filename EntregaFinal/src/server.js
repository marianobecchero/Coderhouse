const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const { logger } = require('./logger')
const { UsersRouter } = require('./router/UsersRouter')
const { ProductsRouter } = require('./router/ProductsRouter')
const { CartsRouter } = require('./router/CartsRouter')
const { OrdersRouter } = require('./router/OrdersRouter')
const { MessagesRouter } = require('./router/MessagesRouter')
const { InfoRouter } = require('./router/InfoRouter')
const { engine } = require('express-handlebars')

const app = express()
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)
const messagesRouter = new MessagesRouter(io)
messagesRouter.startRouter()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', ProductsRouter)
app.use('/api/carts', CartsRouter)
app.use('/api/orders', OrdersRouter)
app.use('/api/users', UsersRouter)
app.use('/api/info', InfoRouter)

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main.hbs' }))
app.set('views', __dirname + '/views')
app.set('view engine', '.hbs')

const PORT = process.env.PORT || 8080

const server = httpServer.listen(PORT, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => logger.error(`Error en servidor ${error}`))
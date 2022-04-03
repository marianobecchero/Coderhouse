const express = require('express')
const { Server: HTTPServer } = require('http')
const { logger } = require('./logger')
const { UsersRouter } = require('./router/UsersRouter')
const { ProductsRouter } = require('./router/ProductsRouter')
const { CartsRouter } = require('./router/CartsRouter')

const app = express()
const httpServer = new HTTPServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', ProductsRouter)
app.use('/api/carts', CartsRouter)
app.use('/', UsersRouter)

const PORT = process.env.PORT || 8080

const server = httpServer.listen(PORT, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => logger.error(`Error en servidor ${error}`))
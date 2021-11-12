const express = require("express")
const { routerProductos } = require("./router/productos")
const { routerCarritos } = require("./router/carritos")

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarritos)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
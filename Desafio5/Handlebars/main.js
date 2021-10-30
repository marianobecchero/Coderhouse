const express = require('express')
const { routerProductos } = require("./router/productos")
const exphbs = require('express-handlebars')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'listaProductos.hbs'
}))
  
app.set('views', './views')

/* ------------------------------------------------------ */
/* Cargo los routers */

app.use('/api/productos', routerProductos)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
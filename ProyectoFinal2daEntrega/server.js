//import express from 'express'
//import { personasRouter } from './routers/personasRouter.js'
const express = require('express')
const { productosRouter } = require('./router/productosRouter.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productosRouter)

app.all('*', (req, res) => {
    res.json({ error : -2, descripcion: `ruta '${req.url}' método ${req.method} no implementada`})
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
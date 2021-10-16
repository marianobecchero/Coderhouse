const express = require('express')
const {Contenedor} = require('./Contenedor')

const app = express()
const contenedor = new Contenedor("Productos.txt");

const servidor = async() =>{
    let arrProductos = []
    const arrObjeto = await contenedor.getAll();

    app.get('/productos', (req,res) => {
        res.send(arrObjeto)
        
    })

    app.get('/productoRandom', (req,res) => {
        res.send(arrObjeto[Math.floor(Math.random() * arrObjeto.length)])
        
    })
    
    const PORT = 8080
    
    const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))

}

servidor()
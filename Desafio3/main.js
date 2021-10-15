const express = require('express')
const {Contenedor} = require('./Contenedor')

const app = express()
const contenedor = new Contenedor("Productos.txt");


// const productos = async() =>{
//     let arrProductos = []
//     const arrObjeto = await contenedor.getAll();

//     for (const objeto of arrObjeto){
//         arrProductos.push(objeto.title)
//     }

//     return arrProductos
// }

/*const imprimir = async() =>{
    console.log(await contenedor.getAllNombreProductos()) 
}*/

//imprimir()

const servidor = async() =>{
    let arrProductos = []
    const arrObjeto = await contenedor.getAll();

    for (const objeto of arrObjeto){
        arrProductos.push(objeto.title)
    }


    app.get('/productos', (req,res) => {
        /*let str = ""
        for (const producto of arrProductos){
            str = str + producto.title + "<br>"
        }*/
        
        res.send(`${arrProductos}`)
        
    })
    
    const PORT = 8080
    
    const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))

}

servidor()
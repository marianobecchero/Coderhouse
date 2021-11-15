const { Router } = require('express')
const {Contenedor} = require('../contenedor/contCarritos')

const contenedor = new Contenedor("Carritos.txt");

const routerCarritos = Router();

/*routerCarritos.get('/', (req,res) => {
    const test = async() =>{
        res.json(await contenedor.getAll())
    }
    test()
})*/

routerCarritos.get('/:id/productos', (req,res) => {
    const test = async() =>{
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            res.json({ error: 'El parámetro ingresado no es un número' })
        } else {
            const carrito = await contenedor.getById(id)

            if (carrito === null){
                res.json({ error : 'Carrito no encontrado' })
            } else if (carrito.productos.length < 1) {
                res.json({ advertencia: 'El carrito no tiene productos' })
            } else {
                res.json(carrito.productos)
            }   
        }
    }
    test()
})

routerCarritos.post('/', (req,res) => {
    const test = async() =>{
        const idObjeto = await contenedor.save()

        res.json({ Correcto: 'El carrito se agregó correctamente con ID: ' + idObjeto })

    }
    test()
})

routerCarritos.post('/:id/productos', (req,res) => {
    const test = async() => {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            res.json({ error: 'El parámetro ingresado no es un número' })
        } else {
            const productos = req.body

            const existeCarrito = await contenedor.addProductos(productos, id)

            if (existeCarrito === null) {
                res.json({ error: 'El carrito no existe o la lista de productos está vacía' })
            } else {
                res.json({ Correcto: 'Los productos se agregaron correctamente' })
            }
        }
    }
    test()
})

routerCarritos.delete('/:id', (req,res) => {
    const test = async() =>{
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            res.json({ error: 'El parámetro ingresado no es un número' })
        } else {
            const objExiste = await contenedor.deleteById(id)

            if (objExiste === null){
                res.json({ error : 'Carrito no encontrado' })
            } else {
                res.json({ Correcto: 'El carrito se eliminó correctamente'})
            }
        } 
    }
    test()
})

routerCarritos.delete('/:id/productos/:id_prod', (req,res) => {
    const test = async() =>{
        const idCarrito = parseInt(req.params.id)
        const idProducto = parseInt(req.params.id_prod)

        if (isNaN(idCarrito) || isNaN(idProducto)) {
            res.json({ error: 'El parámetro ingresado no es un número' })
        } else {
            const objExiste = await contenedor.deleteProductoEnCarrito(idProducto, idCarrito)

            if (objExiste === null) {
                res.json({ error : 'Carrito o producto no encontrado' })
            } else {
                res.json({ Correcto: 'El producto se eliminó correctamente'})
            }
        }
    }
    test()
})





exports.routerCarritos = routerCarritos;
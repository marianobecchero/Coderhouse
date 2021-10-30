const { Router } = require('express')
const {Contenedor} = require('../Contenedor')

const contenedor = new Contenedor("Productos.txt");

const routerProductos = Router();


routerProductos.get('/', (req,res) => {
    const test = async() =>{
        const productos = await contenedor.getAll()
        res.render('productos.pug', {productos: productos});
    }
    test()
})

routerProductos.get('/:id', (req,res) => {
    

    const test = async() =>{
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            res.json({ error: 'El parámetro ingresado no es un número' })
        }

        const producto = await contenedor.getById(id)

        if (producto === null){
            res.json({ error : 'producto no encontrado' })
        }

        res.json(producto)
    }
    test()
})

routerProductos.post('/', (req,res) => {
    const test = async() =>{
        const productos = await contenedor.getAll()
        const productoNuevo = req.body

        await contenedor.save(productoNuevo)

        res.redirect('/')

    }
    test()
})

routerProductos.put('/:id', (req,res) => {
    const test = async() =>{
        const productos = await contenedor.getAll()
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            res.json({ error: 'El parámetro ingresado no es un número' })
        }

        if (id < 1 || id > productos.length){
            res.json({ error : 'producto no encontrado' })
        }

        const productoAModificar = req.body

        productos[id - 1] = productoAModificar

        await contenedor.saveAll(productos)

        res.json({ Correcto: 'El producto se actualizó correctamente'})

    }
    test()
})

routerProductos.delete('/:id', (req,res) => {
    const test = async() =>{
        const productos = await contenedor.getAll()
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            res.json({ error: 'El parámetro ingresado no es un número' })
        }
    
        if (id < 1 || id > productos.length){
            res.json({ error : 'producto no encontrado' })
        }

        contenedor.deleteById(id)

        res.json({ Correcto: 'El producto se eliminó correctamente'})
    }
    test()

})

exports.routerProductos = routerProductos;
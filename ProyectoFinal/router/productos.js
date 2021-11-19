const { Router } = require('express')
const {ContenedorProductos} = require('../contenedor/contProductos')

const contenedorProductos = new ContenedorProductos("Productos.txt");

const routerProductos = Router();

const esAdministrador = true

routerProductos.get('/', (req,res) => {
    const test = async() =>{
        res.json(await contenedorProductos.getAll())
    }
    test()
})

routerProductos.get('/:id', (req,res) => {
    

    const test = async() =>{
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            res.json({ error: 'El parámetro ingresado no es un número' })
        } else {
            const producto = await contenedorProductos.getById(id)

            if (producto === null){
                res.json({ error : 'Producto no encontrado' })
            } else {
                res.json(producto)
            }
        } 
    }
    test()
})

routerProductos.post('/', (req,res) => {
    const test = async() =>{

        if (esAdministrador === false){
            res.json({ error: "No tiene permisos para realizar cambios" })
        } else {
            const productoNuevo = req.body

            await contenedorProductos.save(productoNuevo)

            res.json({ Correcto: 'El producto se agregó correctamente' })
        }
    }
    test()
    
})

routerProductos.put('/:id', (req,res) => {
    const test = async() =>{
        if (esAdministrador === false){
            res.json({ error: "No tiene permisos para realizar cambios" })
        } else {
            const id = parseInt(req.params.id)

            if (isNaN(id)) {
                res.json({ error: 'El parámetro ingresado no es un número' })
            } else {
                const objeto = req.body
                objeto.id = id

                const objExiste = await contenedorProductos.update(objeto)

                if (objExiste === null) {
                    res.json({ error : 'producto no encontrado' })
                } else {
                    res.json({ Correcto: 'El producto se actualizó correctamente'})
                }
            } 
        }
    }
    test()
})

routerProductos.delete('/:id', (req,res) => {
    const test = async() =>{

        if (esAdministrador === false){
            res.json({ error: "No tiene permisos para realizar cambios" })
        } else {
            const id = parseInt(req.params.id)

            if (isNaN(id)) {
                res.json({ error: 'El parámetro ingresado no es un número' })
            } else {
                const objExiste = await contenedorProductos.deleteById(id)

                if (objExiste === null) {
                    res.json({ error : 'Producto no encontrado' })
                } else {
                    res.json({ Correcto: 'El producto se eliminó correctamente'})
                }
            }  
        }
    }
    test()

})

exports.routerProductos = routerProductos;
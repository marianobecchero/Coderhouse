//import { Router } from 'express';
//import { personasDao } from '../daos/personas/index.js'
const { Router } = require('express')
const { carritosDao } = require('../dao/carritos/index.js')
const { productosDao } = require('../dao/productos/index.js')

const carritosRouter = Router()

const esAdministrador = true

carritosRouter.get('/:id/productos', async (req, res) => {
    const execute = async() => {
        const idCarrito = req.params.id

        if (isNaN(idCarrito)){
            res.json({ Error: 'Parámetro erróneo' })
        } else {
            const carrito = await carritosDao.getById(idCarrito)
            if (carrito == null){
                res.json({ Error: `No existe el carrito con id ${idCarrito}` })
            } else if (carrito.productos.length == 0) {
                res.json({ Error: 'El carrito no tiene productos' })
            } else {
                const productosCarrito = carrito.productos
                res.json(productosCarrito)
            }
        }
    }
    execute()
})

carritosRouter.post('/', async (req, res) => {
    const execute = async() => {
        const carrito = await carritosDao.save(req.body);
        res.json(carrito)
    }
    execute()
})

carritosRouter.post('/:id/productos', (req,res) => {
    const execute = async() => {
        const idCarrito = parseInt(req.params.id)
        const producto = req.body

        if (isNaN(idCarrito)){
            res.json({ Error: 'Parámetro erróneo' }) 
        } else {
            const productoCarrito = await productosDao.getById(producto.id)
            if (productoCarrito == null){
                res.json({ Error: `No se encontró el producto con id ${producto.id}` })
            } else {
                const carrito = await carritosDao.getById(idCarrito)
                if (carrito == null){
                    res.json({ Error: `No se encontró el carrito con id ${idCarrito}` })
                } else {
                    carrito.productos.push(productoCarrito)
                    const carritoAgregado = await carritosDao.addProductoCarrito(carrito)
                    res.json(carritoAgregado)
                }
            }
        }

        
    }
    execute()
})

carritosRouter.delete('/:id', async (req, res) => {
    const execute = async() => {
        const carrito = await carritosDao.deleteById(req.params.id);
        res.json(carrito)
    }
    execute()
})

carritosRouter.delete('/:id/productos/:id_prod', (req,res) => {
    const execute = async() =>{
        const idCarrito = req.params.id
        const idProducto = req.params.id_prod

        if (isNaN(idCarrito) || isNaN(idProducto)){
            res.json({ Error: 'Parámetro erróneo' })
        } else {
            const carrito = await carritosDao.getById(idCarrito)
            if (carrito == null){
                res.json({ Error: `No se encontró el carrito con id ${idCarrito}` })
            } else {
                const indexProducto = carrito.productos.findIndex(obj => obj.id == idProducto)
                if (indexProducto == -1){
                    res.json({ Error: `No se encontró el producto con id ${idProducto}` })
                } else {
                    carrito.productos.splice(indexProducto, 1)
                    const productoEliminar = await carritosDao.deleteProductoEnCarrito(carrito)
                    res.json(productoEliminar)
                }
            }
        } 
    }
    execute()
})

exports.carritosRouter = carritosRouter;
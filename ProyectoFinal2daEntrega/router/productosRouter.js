//import { Router } from 'express';
//import { personasDao } from '../daos/personas/index.js'
const { Router } = require('express')
const { productosDao } = require('../dao/productos/index.js')

const productosRouter = Router()

const esAdministrador = true

productosRouter.get('/', async (req, res) => {
    const execute = async() => {
        const productos = await productosDao.getAll()
        res.json(productos)
    }
    execute()
})

productosRouter.get('/:id', async (req, res) => {
    const execute = async() => {
        const id = req.params.id

        if (isNaN(id)){
            res.json({ Error: 'Parámetro erróneo' }) 
        } else {
            const producto = await productosDao.getById(id);
        
            if (producto == null){
                res.json({ Error: `No se encontró el producto con id ${id}`})
            } else {
                res.json(producto)
            }
        }
    }
    execute()
})

productosRouter.post('/', async (req, res) => {
    const execute = async() => {
        if (esAdministrador == true){
            const producto = await productosDao.save(req.body);
            res.json(producto)
        } else {
            res.json({Error: 'No tiene permisos para realizar este método'})
        }  
    }
    execute()
})

productosRouter.put('/:id', async (req, res) => {
    const execute = async() => {
        if (esAdministrador == true){
            const idProducto = req.params.id

            if(isNaN(idProducto)){
                res.json({ Error: 'Parámetro erróneo' })
            } else {
                const producto = await productosDao.getById(idProducto)
                if (producto == null){
                    res.json({ Error: `No se encontró el producto con id ${idProducto}` }) 
                } else {
                    const productoModificar = {...req.body, id: parseInt(idProducto), timestamp: producto.timestamp}
                    const modificar = await productosDao.update(productoModificar)
                    res.json(modificar)
                }
            }
        } else {
            res.json({Error: 'No tiene permisos para realizar este método'})
        }
    }
    execute()
})

productosRouter.delete('/:id', async (req, res) => {
    const execute = async() => {
        if (esAdministrador == true){
            const producto = await productosDao.deleteById(req.params.id);
            res.json(producto)
        } else {
            res.json({Error: 'No tiene permisos para realizar este método'})
        }
    }
    execute()
})

exports.productosRouter = productosRouter;
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
        const producto = await productosDao.getById(req.params.id);
        res.json(producto)
    }
    execute()
})

productosRouter.post('/', async (req, res) => {
    const execute = async() => {
        if (esAdministrador == true){
            const producto = await productosDao.save(req.body);
            res.json({Correcto: 'El producto se agregó correctamente'})
        } else {
            res.json({Error: 'No tiene permisos para realizar este método'})
        }  
    }
    execute()
})

productosRouter.put('/:id', async (req, res) => {
    const execute = async() => {
        if (esAdministrador == true){
            const object = {...req.body, id: req.params.id}
            const producto = await productosDao.update(object);
            res.json(producto)
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
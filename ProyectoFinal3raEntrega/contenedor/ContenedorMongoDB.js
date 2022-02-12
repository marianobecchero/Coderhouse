//import mongoose from 'mongoose'
//import config from '../config.js'
const mongoose = require('mongoose')
const { config } = require('../config.js')
const { logger } = require('../logger.js')

const conection = async() => {
    try {
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
        //console.log('Base de datos conectada')
    } catch(error){
        //return {Error: 'No se pudo conectar a la base de datos'}
        logger.error('ERROR: No se pudo conectar a la base de datos')
    }
}
conection()

class ContenedorMongoDB {

    constructor(nombreColeccion, schema) {
        this.coleccion = mongoose.model(nombreColeccion, schema)
    }

    getAll = async() => {
        try {
            const arrObjects = await this.coleccion.find({}, { _id: 0, __v: 0 })
            return arrObjects
        } catch (error) {
            //return {message: 'No se pudo obtener los objetos'}
            logger.error('ERROR: No se pudo obtener los objetos')
        }
    }
    
    getById = async(id) => {
        try{
            const object = await this.coleccion.findOne({ id: id }, { _id: 0, __v: 0 })
            return object
        } catch(error){
            //return {message: `No se pudo obtener el objeto ${error}`}
            logger.error(`ERROR: No se pudo obtener el objeto ${error}`)
        }
    }

    getByUsername = async(username) => {
        try{
            const object = await this.coleccion.findOne({ username: username }, { _id: 0, __v: 0 })
            return object
        } catch(error){
            //return {message: `No se pudo obtener el objeto ${error}`}
            logger.error(`ERROR: No se pudo obtener el objeto ${error}`)
        }
    }

    save = async obj => {
        const arrObjects = await this.getAll()

        let newId
        if (arrObjects.length == 0) {
            newId = 1
        } else {
            newId = arrObjects[ arrObjects.length - 1 ].id + 1
        }

        let fecha = new Date()

        const newObject = { ...obj, id: newId, timestamp: fecha.toISOString() }

        try {
            await this.coleccion.create(newObject)
            return { message: 'El objeto se agregó correctamente' }
        } catch (error) {
            //return { message: `No se pudo guardar el objeto: ${error}`}
            logger.error(`ERROR: No se pudo guardar el objeto: ${error}`)
        }
    }

    saveUser = async obj => {
        const arrObjects = await this.getAll()

        let newId
        if (arrObjects.length == 0) {
            newId = 1
        } else {
            newId = arrObjects[ arrObjects.length - 1 ].id + 1
        }

        const newObject = { ...obj, id: newId }

        try {
            await this.coleccion.create(newObject)
            return newObject
        } catch (error) {
            //return { message: `No se pudo guardar el objeto: ${error}`}
            logger.error(`ERROR: No se pudo guardar el objeto: ${error}`)
        }
    }

    update = async obj => {
        try {
            await this.coleccion.updateOne({id: obj.id}, obj)
            return { message: 'El objeto se modificó correctamente' }
        } catch (error) {
            //return { message: `No se pudo actualizar el objeto: ${error}`}
            logger.error(`ERROR: No se pudo actualizar el objeto: ${error}`)
        }
    }

    deleteById = async id => {
        
        if (isNaN(id)){
            return { message: 'Parámetro erróneo' }
        }
        
        const object = await this.getById(id)
        
        if (object == null) {
            return { message: `No se encontró el objeto con id ${id}` }
            //throw new Error(`Error al actualizar: no se encontró el objeto con id ${id}`)
        } 

        try {
            await this.coleccion.deleteOne({ id: id })
            return { message: 'El objeto se ha eliminado' }
        } catch (error) {
            //return { message: `No se pudo borrar el objeto: ${error}`}
            logger.error(`ERROR: No se pudo borrar el objeto: ${error}`)
        }
    }

    addProductoCarrito = async obj => {
        try {
            await this.coleccion.updateOne({id: obj.id}, obj)
            return { message: 'El producto se agregó al carrito' }
        } catch (error) {
            //return { message: `No se pudo agregar el producto al carrito ${error}` }
            logger.error(`ERROR: No se pudo agregar el producto al carrito ${error}`)
        }
    }

    deleteProductoEnCarrito = async obj => {
        try {
            await this.coleccion.updateOne({id: obj.id}, obj)
            return { message: 'El producto se ha eliminado' }
        } catch (error) {
            //return { message: `No se pudo borrar el objeto: ${error}`}
            logger.error(`ERROR: No se pudo borrar el objeto: ${error}`)
        }
    }

    vaciarCarrito = async id => {
        
        if (isNaN(id)){
            return { message: 'Parámetro erróneo' }
        }
        
        const object = await this.getById(id)
        
        if (object == null) {
            return { message: `No se encontró el objeto con id ${id}` }
            //throw new Error(`Error al actualizar: no se encontró el objeto con id ${id}`)
        }

        const newObject = {
            id: object.id,
            timestamp: object.timestamp,
            productos: []
        }

        try {
            await this.coleccion.updateOne({id: newObject.id}, newObject)
            return { message: 'El carrito se ha vaciado' }
        } catch (error) {
            //return { message: `No se pudo vaciar el carrito: ${error}`}
            logger.error(`ERROR: No se pudo vaciar el carrito: ${error}`)
        }
    }

}

module.exports = { ContenedorMongoDB }
//export default ContenedorMongoDb
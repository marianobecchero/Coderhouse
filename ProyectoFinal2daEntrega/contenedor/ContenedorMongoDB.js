//import mongoose from 'mongoose'
//import config from '../config.js'
const mongoose = require('mongoose')
const { config } = require('../config.js')

const conection = async() => {
    try {
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
        console.log('Base de datos conectada')
    } catch(error){
        return {Error: 'No se pudo conectar a la base de datos'}
    }
}
conection()

class ContenedorMongoDB {

    constructor(nombreColeccion, schema) {
        this.coleccion = mongoose.model(nombreColeccion, schema)
    }

    getAll = async() => {
        try {
            const arrObjects = await this.coleccion.find({})
            return arrObjects
        } catch (error) {
            return {Error: 'No se pudo obtener los objetos'}
        }
    }
    
    getById = async(id) => {
        try{
            const object = await this.coleccion.findOne({ id: id }, { _id: 0, __v: 0 })
            return object
        } catch(error){
            return {Error: `No se pudo obtener el objeto ${error}`}
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
            this.coleccion.create(newObject)
            return { Correcto: 'El objeto se agregó correctamente' }
        } catch (error) {
            return { Error: `No se pudo guardar el objeto: ${error}`}
        }
    }

    update = async obj => {
        try {
            await this.coleccion.updateOne({id: obj.id}, obj)
            return { Correcto: 'El objeto se modificó correctamente' }
        } catch (error) {
            return { Error: `No se pudo actualizar el objeto: ${error}`}
        }
    }

    deleteById = async id => {
        
        if (isNaN(id)){
            return { Error: 'Parámetro erróneo' }
        }
        
        const object = await this.getById(id)
        
        if (object == null) {
            return { Error: `No se encontró el objeto con id ${id}` }
            //throw new Error(`Error al actualizar: no se encontró el objeto con id ${id}`)
        } 

        try {
            await this.coleccion.deleteOne({ id: id })
            return { Correcto: 'El objeto se ha eliminado' }
        } catch (error) {
            return { Error: `No se pudo borrar el objeto: ${error}`}
        }
    }

    addProductoCarrito = async obj => {
        try {
            await this.coleccion.updateOne({id: obj.id}, obj)
            return { Correcto: 'El producto se agregó al carrito' }
        } catch (error) {
            return { Error: `No se pudo agregar el producto al carrito ${error}` }
        }
    }

    deleteProductoEnCarrito = async obj => {
        try {
            await this.coleccion.updateOne({id: obj.id}, obj)
            return { Correcto: 'El producto se ha eliminado' }
        } catch (error) {
            return { Error: `No se pudo borrar el objeto: ${error}`}
        }
    }

}

module.exports = { ContenedorMongoDB }
//export default ContenedorMongoDb
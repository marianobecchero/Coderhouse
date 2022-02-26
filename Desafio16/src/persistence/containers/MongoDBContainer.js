const mongoose = require('mongoose')
const { config } = require('../config.js')

const conection = async() => {
    try {
        await mongoose.connect(config.cnxStr, config.options)
        //console.log('Base de datos conectada')
    } catch(error){
        console.log(error)
    }
}
conection()

class MongoDBContainer {

    constructor(nombreColeccion, schema) {
        this.coleccion = mongoose.model(nombreColeccion, schema)
    }

    getById = async(id) => {
        try{
          const object = await this.coleccion.findOne({ id: id }, { _id: 0, __v: 0 })
          return object
        } catch(error){
            return error
        }
    }

    getByUsername = async(username) => {
        try{
          const object = await this.coleccion.findOne({ username: username }, { _id: 0, __v: 0 })
          return object
        } catch(error){
            return error
        }
    }

    save = async obj => {
        try {
            await this.coleccion.create(obj)
            //return { Correcto: 'El objeto se agregó correctamente' }
        } catch (error) {
            return error
        }
    }

    saveMensaje = async obj => {
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
            return error
        } catch (error) {
            return error
        }
    }

    getAll = async() => {
        try {
            const arrObjects = await this.coleccion.find({}, { _id: 0, __v: 0 })
            return arrObjects
        } catch (error) {
            return {Error: 'No se pudo obtener los objetos'}
        }
    }

}

module.exports = { MongoDBContainer }
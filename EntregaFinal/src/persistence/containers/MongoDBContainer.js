const mongoose = require('mongoose')
const { config } = require('../config.js')
//const { logger } = require('log4js')

const conection = async() => {
    try {
        await mongoose.connect(config.cnxStr, config.options)
        //logger.info('Base de datos conectada')
    } catch(error){
        //logger.error(error)
    }
}
conection()

class MongoDBContainer {

    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }

    getById = async(id) => {
        try{
          const object = await this.collection.findOne({ _id: id }, { __v: 0 })
          return object
        } catch(error){
            return error
        }
    }

    getByUsername = async(username) => {
        try{
          const object = await this.collection.findOne({ username: username }, { __v: 0 })
          return object
        } catch(error){
            return error
        }
    }

    save = async obj => {
        try {
            await this.collection.create(obj)
            return obj
            //return { Correcto: 'El objeto se agregó correctamente' }
        } catch (error) {
            return error
        }
    }

    delete = async (id) => {
        try {
            await this.collection.deleteOne({ _id: `${id}` })
            return id
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getAll = async() => {
        try {
            const objects = await this.collection.find({}, { __v: 0 })
            return objects
        } catch (error){
            console.log(error)
            return error
        }
    }

    update = async(id, obj) => {
        try {
            await this.collection.updateOne({ _id: `${id}` }, { 
                title: `${obj.title}`,
                description: `${obj.description}`,
                price: `${obj.price}`,
                photoURL: `${obj.photoURL}`
             })
            return obj
            //return { Correcto: 'El objeto se agregó correctamente' }
        } catch (error) {
            return error
        }
    }

    modifyCart = async(obj) => {
        try {
            await this.collection.updateOne({ idUser: `${obj.idUser}` }, {
                products: obj.products
            })
            return obj
        } catch(error) {
            console.log(error)
            return error
        }

    }

    /*saveMensaje = async obj => {
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
    }*/

}

module.exports = { MongoDBContainer }
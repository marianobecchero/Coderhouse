//import admin from "firebase-admin"
//import config from '../config.js'
const admin = require('firebase-admin')
const { config } = require('../config.js')
const fs = require('fs')

const serviceAccount = JSON.parse(fs.readFileSync(config.firebase.uri, 'utf-8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    getAll = async() => {
        try {
            const collectionObjects = await this.coleccion.get();
            const arrObjects = []

            collectionObjects.forEach(doc => {
                arrObjects.push({ id: doc.id, ...doc.data() })
            })

            return arrObjects
        } catch (error) {
            return {Error: `No se pudo obtener los objetos: ${error}`}
        }
    }

    getById = async(id) => {
        try{
            const document = await this.coleccion.doc(`${id}`).get();
            const object = document.data()
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
            const document = this.coleccion.doc(`${newObject.id}`)
            await document.create(newObject)
            return { Correcto: 'El objeto se agregó correctamente' }
        } catch (error) {
            return { Error: `No se pudo guardar el objeto: ${error}`}
        }
    }

    update = async obj => {
        try {
            await this.coleccion.doc(`${obj.id}`).set(obj)
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
            await this.coleccion.doc(id).delete()
            return { Correcto: 'El objeto se ha eliminado' }
        } catch (error) {
            return { Error: `No se pudo borrar el objeto: ${error}`}
        }
    }

    addProductoCarrito = async obj => {
        try {
            await this.coleccion.doc(`${obj.id}`).set(obj)
            return { Correcto: 'El producto se agregó al carrito' }
        } catch (error) {
            return { Error: `No se pudo agregar el producto al carrito ${error}` }
        }
    }

    deleteProductoEnCarrito = async obj => {
        try {
            await this.coleccion.doc(`${obj.id}`).set(obj)
            return { Correcto: 'El producto se ha eliminado' }
        } catch (error) {
            return { Error: `No se pudo borrar el objeto: ${error}`}
        }
    }

    /*async borrarAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }*/

}

module.exports = { ContenedorFirebase }
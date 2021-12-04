const { json } = require('express');
const fs = require ('fs');


class ContenedorArchivo {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    getAll = async() => {
        try {
            const arrObjects = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            return JSON.parse(arrObjects)
        } catch (error) {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));
            const contenidoObjeto = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(contenidoObjeto);
        }
    }

    getById = async id => {
        const arrObjects = await this.getAll()
        const object = arrObjects.find(obj => obj.id == id)

        if (isNaN(id)){
            return {Error: 'Parámetro erróneo'}
        } else if (object == undefined){
            return {Error: `No se encontró el objeto con id ${id}`}
            //throw new Error(`Error: no se encontró el objeto con id ${id}`)
        } else {
            return object
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
        arrObjects.push(newObject)

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjects, null, 2))
            return { Correcto: 'El objeto se agregó correctamente' }
        } catch (error) {
            //throw new Error(`Error al guardar: ${error}`)
            return { Error: `No se pudo guardar el objeto: ${error}`}
        }
    }

    update = async obj => {
        const arrObjects = await this.getAll()
        const index = arrObjects.findIndex(o => o.id == obj.id)
        if (isNaN(obj.id)){
            return { Error: 'Parámetro erróneo'}
        } else if (index == -1) {
            return { Error: `No se encontró el objeto con id ${obj.id}` }
            //throw new Error(`Error al actualizar: no se encontró el objeto con id ${id}`)
        } else {
            arrObjects[ index ] = {...obj, id: arrObjects[index].id, timestamp: arrObjects[index].timestamp}
        }
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjects, null, 2))
            return { Correcto: 'El objeto se modificó correctamente' }
        } catch (error) {
            return { Error: `No se pudo actualizar el objeto: ${error}`}
        }
    }

    deleteById = async id => {
        const arrObjects = await this.getAll()
        const index = arrObjects.findIndex(obj => obj.id == id)

        if (isNaN(id)){
            return { Error: 'Parámetro erróneo' }
        } else if (index == -1) {
            return { Error: `No se encontró el objeto con id ${id}`}
            //throw new Error(`Error al borrar: no se encontró el objeto con id ${id}`)
        } else {
            const deleted = arrObjects.splice(index, 1)[ 0 ]
        }

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjects, null, 2))
            return { Correcto: 'El objeto se ha eliminado' }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    deleteAll = async() => {
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2))
        } catch (error) {
            return { Error: `No se pudo borrar el objeto: ${error}`}
        }
    }


    addProductoCarrito = async (idCarrito, producto) => {
        const arrObjects = await this.getAll();

        const index = arrObjects.findIndex(obj => obj.id == idCarrito)

        if (isNaN(idCarrito) || isNaN(producto.id)){
            return { Error: 'Parámetro erróneo' }
        }
        if (index == -1){
            return { Error: `No se encontró el carrito con id ${idCarrito}`}
        } else {
            const contenedorProductos = new ContenedorArchivo('./DB/productos.json')
            const newObject = await contenedorProductos.getById(producto.id)
            if (!newObject.hasOwnProperty('id')){
                return { Error: `No se encontró el producto con id ${producto.id}` }
            } else {
                arrObjects[index].productos.push(newObject)
            }
        }

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjects, null, 2));
            return { Correcto: 'El producto se agregó al carrito' }
        } catch (error) {
            throw new Error ("No se pudo agregar el producto al carrito");
        }
    }

    deleteProductoEnCarrito = async (idProducto, idCarrito) => {
        const arrObjects = await this.getAll()
        const object = arrObjects.find(obj => obj.id == idCarrito)
        const indexObject = arrObjects.findIndex(obj => obj.id == idCarrito)

        if (isNaN(idCarrito) || isNaN(idProducto)) {
            return { Error: 'Parámetro erróneo'}
        } else if (indexObject == -1){
            return { Error: `No se encontró el carrito con id ${idCarrito}` }
        } else {
            const indexObjectDelete = object.productos.findIndex(obj => obj.id == idProducto)
            if (indexObjectDelete == -1){
                return { Error: `No se encontró el producto con id ${idProducto}` }
            } else {
                object.productos.splice(indexObjectDelete, 1)
            }
        }
            
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjects, null, 2));
            return { Correcto: 'El producto se ha eliminado' }
        } catch (error) {
            throw new Error ("No se pudo eliminar el objeto");
        }
    }

}

module.exports = {ContenedorArchivo};
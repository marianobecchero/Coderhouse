const productos = []

class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    getAll() {
        return [ ...this.elementos ]
    }

    getById(id) {
        const elemento = this.elementos.find(elem => elem.id == id)
       
        if (isNaN(id)){
            return {Error: 'Parámetro erróneo'}
        } else if (!elemento){
            return {Error: `No se encontró el elemento con id ${id}`}
            //throw new Error(`Error al listar: elemento no encontrado`)
        } else {
            return elemento
        }
    }

    save(elem) {

        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[ this.elementos.length - 1 ].id + 1
        }
        
        let fecha = new Date()

        const newElem = { ...elem, id: newId, timestamp: fecha.toISOString() }
        this.elementos.push(newElem)
        if (newElem.hasOwnProperty('stock')){
            productos.push(newElem)
        }
        return { Correcto: 'El elemento se agregó correctamente' }
    }

    update(elem) {
        const index = this.elementos.findIndex(e => e.id == elem.id)
        if (isNaN(elem.id)){
            return { Error: 'Parámetro erróneo'}
        } else if (index == -1) {
            return { Error: `No se encontró el elemento con id ${elem.id}` }
            //throw new Error(`Error al actualizar: elemento no encontrado`)
        } else {
            this.elementos[ index ] = {...elem, id: this.elementos[index].id, timestamp: this.elementos[index].timestamp}
            productos[ index ] = {...elem, id: this.elementos[index].id, timestamp: this.elementos[index].timestamp}
            return { Correcto: 'El elemento se modificó correctamente' }
        }
    }

    deleteById(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        const elemento = this.elementos.find(elem => elem.id == id)
        if (isNaN(id)){
            return { Error: 'Parámetro erróneo' }
        } else if (index == -1) {
            return { Error: `No se encontró el elemento con id ${id}`}
            //throw new Error(`Error al borrar: elemento no encontrado`)
        } else {
            this.elementos.splice(index, 1)[ 0 ]
            if (elemento.hasOwnProperty('stock')){
                productos.splice(index, 1)[ 0 ]
            }
            return { Correcto: 'El elemento se ha eliminado' }
        }
    }

    deleteAll() {
        this.elementos = []
    }

    addProductoCarrito(idCarrito, producto) {
        const index = this.elementos.findIndex(elem => elem.id === idCarrito)

        if (isNaN(idCarrito) || isNaN(producto.id)){
            return { Error: 'Parámetro erróneo' }
        }
        if (index == -1){
            return { Error: `No se encontró el carrito con id ${idCarrito}`}
        } else {
            const newProducto = productos.find(elem => elem.id == producto.id)
            if (newProducto == null){
                return { Error: `No se encontró el producto con id ${producto.id}` }
            } else {
                this.elementos[index].productos.push(newProducto)
                return { Correcto: 'El producto se agregó al carrito' }
            }
        }
    }

    deleteProductoEnCarrito(idProducto, idCarrito) {
        const elemento = this.elementos.find(elem => elem.id === idCarrito)
        //const indexElemento = this.elementos.findIndex(elem => elem.id === idCarrito)

        if (isNaN(idCarrito) || isNaN(idProducto)) {
            return { Error: 'Parámetro erróneo'}
        } else if (elemento == null){
            return { Error: `No se encontró el carrito con id ${idCarrito}` }
        } else {
            const indexElementoDelete = elemento.productos.findIndex(elem => elem.id === idProducto)
            if (indexElementoDelete == -1){
                return { Error: `No se encontró el producto con id ${idProducto}` }
            } else {
                elemento.productos.splice(indexElementoDelete, 1)
                return { Correcto: 'El producto se ha eliminado' }
            }
        }
    }
}

module.exports = {ContenedorMemoria};
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
        return elemento
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
        this.elementos[ index ] = {...elem}
        productos[ index ] = {...elem}
        return { Correcto: 'El elemento se modificó correctamente' }
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

    addProductoCarrito(obj) {
        const index = this.elementos.findIndex(elem => elem.id == obj.id)
        this.elementos[index] = { ...obj }
        return { Correcto: 'El producto se agregó al carrito' }
    }

    deleteProductoEnCarrito(obj) {
        const index = this.elementos.findIndex(elem => elem.id == obj.id)
        this.elementos[index] = { ...obj }
        return { Correcto: 'El producto se ha eliminado' }
    }
}

module.exports = {ContenedorMemoria};
const fs = require ('fs');

class Contenedor{
    
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    getAll = async() => {
        try {
            const contenidoObjeto = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(contenidoObjeto);
        } catch (error) {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));
            const contenidoObjeto = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(contenidoObjeto);
        }
    }

    getById = async id => {
        const arrObjeto = await this.getAll();

        const objeto = arrObjeto.find(obj => obj.id === id)

        if (objeto === undefined)
            return null;
        

        return objeto;

    }

    save = async() => {
        const arrObjeto = await this.getAll();

        const objeto = {}
        objeto.productos = []
        let fecha = new Date()
        objeto.timestamp = fecha.toISOString()

        if (arrObjeto.length < 1){
            objeto.id = 1
        } else {
            objeto.id = arrObjeto[arrObjeto.length - 1].id + 1;
        }
        

        arrObjeto.push(objeto);

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjeto, null, 2));
            return objeto.id;
        } catch (error) {
            throw new Error ("No se pudo guardar el objeto");
        }
    }

    addProductos = async (arrProductos, id) => {
        const arrObjeto = await this.getAll();

        const indexCarrito = arrObjeto.findIndex(obj => obj.id === id)
        const objeto = arrObjeto.find(obj => obj.id === id)

        if (objeto === undefined || arrProductos.length < 1){
            return null
        } else {
            arrObjeto[indexCarrito].productos.push(arrProductos)
        }

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjeto, null, 2));
        } catch (error) {
            throw new Error ("No se pudo agregar los productos al carrito");
        }
    }

    deleteById = async id => {
        const arrObjeto = await this.getAll();

        const indexObjAEliminar = arrObjeto.findIndex(obj => obj.id === id)

        if (indexObjAEliminar === -1){
            return null;
        } else {
            arrObjeto.splice(indexObjAEliminar, 1)
        }
            
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjeto, null, 2));
        } catch (error) {
            throw new Error ("No se pudo eliminar el objeto");
        }
    }

    deleteProductoEnCarrito = async (idProducto, idCarrito) => {
        const arrObjeto = await this.getAll()
        const objeto = arrObjeto.find(obj => obj.id === idCarrito)
        const indexObj = arrObjeto.findIndex(obj => obj.id === idCarrito)

        if (objeto === undefined){
            return null
        } else {
            const indexObjAEliminar = objeto.productos.findIndex(obj => obj.id === idProducto)
            if (indexObjAEliminar === -1){
                return null
            } else {
                objeto.productos.splice(indexObjAEliminar, 1)
            }
        }
            
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjeto, null, 2));
        } catch (error) {
            throw new Error ("No se pudo eliminar el objeto");
        }
    }
    
}

module.exports = {Contenedor};
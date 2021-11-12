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

    save = async objeto => {
        const arrObjeto = await this.getAll();

        if (arrObjeto.length < 1){
            objeto.id = 1
        } else {
            objeto.id = arrObjeto[arrObjeto.length - 1].id + 1;
        }
        
        let fecha = new Date()
        objeto.timestamp = fecha.toISOString()

        arrObjeto.push(objeto);

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjeto, null, 2));
            return objeto.id;
        } catch (error) {
            throw new Error ("No se pudo guardar el objeto");
        }
    }

    getById = async id => {
        const arrObjeto = await this.getAll();

        const objeto = arrObjeto.find(obj => obj.id === id)

        if (objeto === undefined)
            return null;
        

        return objeto;

    }

    update = async objeto => {
        const arrObjeto = await this.getAll()

        const objAModificar = arrObjeto.find(obj => obj.id === objeto.id)

        if (objAModificar === undefined)
            return null;

        objeto.timestamp = objAModificar.timestamp
        const indexObjAModificar = arrObjeto.findIndex(obj => obj.id === objeto.id)
        arrObjeto[indexObjAModificar] = objeto

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjeto, null, 2));
        } catch (error) {
            throw new Error ("No se pudo actualizar el objeto");
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

    deleteAll = async() => {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));
        
    }
    
}

module.exports = {Contenedor};
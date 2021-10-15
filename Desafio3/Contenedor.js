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

    // getAllNombreProductos = async() => {
    //     try {
    //         let arrProductos = []
    //         const arrObjeto = await this.getAll();

    //         for (const objeto of arrObjeto){
    //             arrProductos.push(objeto.title)
    //         }

    //         return arrProductos
    //     } catch (error) {
    //         await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));
    //         const contenidoObjeto = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
    //         return JSON.parse(contenidoObjeto);
    //     }
    // }

    save = async objeto => {
        const arrObjeto = await this.getAll();
        objeto.id = arrObjeto.length + 1;

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

        const objeto = arrObjeto.find(obj => obj.id === id);

        if (objeto === undefined)
            return null;
        

        return objeto;
    }

    deleteById = async id => {
        const arrObjeto = await this.getAll();

        arrObjeto.splice(id - 1, 1);

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjeto, null, 2));
        } catch (error) {
            throw new Error ("No se pudo guardar el objeto");
        }
    }

    deleteAll = async() => {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));
        
    }
    
}

module.exports = {Contenedor};



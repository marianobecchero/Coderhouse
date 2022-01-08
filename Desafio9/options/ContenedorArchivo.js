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

    save = async obj => {
        const arrObjects = await this.getAll()

        let newId
        if (arrObjects.length == 0) {
            newId = 1
        } else {
            newId = arrObjects[ arrObjects.length - 1 ].id + 1
        }

        const newObject = { ...obj, id: newId }
        arrObjects.push(newObject)

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrObjects, null, 2))
            return { Correcto: 'El objeto se agregó correctamente' }
        } catch (error) {
            //throw new Error(`Error al guardar: ${error}`)
            return { Error: `No se pudo guardar el objeto: ${error}`}
        }
    }
}

module.exports = {ContenedorArchivo};
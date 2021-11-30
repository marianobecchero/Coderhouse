/*import mongoose from 'mongoose'    No uso esta sentencia y uso la de abajo, a la vez que agrego la función
                                    const ejecutar = async().. porque tengo una versión desactualizada de node*/
const mongoose = require('mongoose')

const ejecutar = async() => {

    /* ------------------------------------------------------------------ */
    /*               Conexión a la base de datos : colegio                */
    /* ------------------------------------------------------------------ */
    await mongoose.connect('mongodb://localhost/colegio', {
        serverSelectionTimeoutMS: 5000,
    })
    console.log('Base de datos conectada')


    /* --------------------------------------------------------------------- */
    /*  Definición del esquema de documento y del modelo                     */
    /*  (para poder interactuar con la base de datos: leer, escribir, etc)   */
    /* --------------------------------------------------------------------- */
    const estudianteSchema = new mongoose.Schema({
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        dni: { type: String, required: true, unique: true },
        curso: { type: String, required: true },
        nota: { type: Number, required: true },
    })

    const EstudiantesDAO = mongoose.model('estudiantes', estudianteSchema)

    /* --------------------------------------------------------------------- */
    /*  Creación del array para agregar a la DB                              */
    /* --------------------------------------------------------------------- */

    const estudiantes = [
        { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
        { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
        { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
        { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
        { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
        { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
        { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
        { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
        { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
        { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 },
        // descomentar para ver un error!
        //{ apellido: 'sinnombre', edad: 25, dni: '123456', curso: '3B', nota: 2 }
    ]

    /* ------------------------------------------------------------------- */
    /*   Escritura de la base de datos: colegio, collection: estudiantes   */
    /* ------------------------------------------------------------------- */

    // await EstudiantesDAO.insertMany(estudiantes)

    // for (const estudiante of estudiantes) {
    //     await EstudiantesDAO.create(estudiante)
    // }

    const inserciones = []

    for (const estudiante of estudiantes) {
        inserciones.push(EstudiantesDAO.create(estudiante))
    }

    const results = await Promise.allSettled(inserciones)
    
    console.log(results)

    const rejected = results.filter(r => r.status == 'rejected')
    if (rejected.length > 0) {
        console.log(`hubo ${rejected.length} fallos`)
        // console.log(rejected)
    } else {
        console.log('todo ok!')
    }

    await mongoose.disconnect()

}
ejecutar()
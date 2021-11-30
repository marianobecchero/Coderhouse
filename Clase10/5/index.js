//import admin from "firebase-admin" No uso estas sentencias y uso las de abajo, a la vez que agrego la función
//import fs from 'fs'                const ejecutar = async().. porque tengo una versión desactualizada de node

const admin = require('firebase-admin')
const fs = require('fs')

const serviceAccount = JSON.parse(fs.readFileSync("./db/coderhouse-2d177-firebase-adminsdk-n6zja-982be2c8c7.json", 'utf8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

console.log('Base Firebase conectada!')

const db = admin.firestore();
const colores = db.collection('colores')

const ejecutar = async() => {
    // /* --------------------------------------- */
    // 1) Agregar los colores red, green, blue dentro de una colección llamada colores con el formato: { nombre: color }
    const red = await colores.add({ nombre: 'red' });
    const green = await colores.add({ nombre: 'green' });
    const blue = await colores.add({ nombre: 'blue' });
    console.log('Colores insertados')

    // /* --------------------------------------- */
    // 2) Listar todos los colores disponibles.
    const snapshot = await colores.get();
    snapshot.forEach(doc => {
        console.log({ id: doc.id, ...doc.data() })
    })

    // /* --------------------------------------- */
    // 3) Modificar el color blue por navy.
    await colores.doc(blue.id).update({ color: 'navy' });
    console.log("El color ha sido actualizado");

    /* --------------------------------------- */
    await colores.doc(red.id).delete();
    console.log("El color ha sido borrado exitosamente");
}
ejecutar()
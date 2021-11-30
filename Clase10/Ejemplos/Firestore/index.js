//import admin from "firebase-admin" No uso estas sentencias y uso las de abajo, a la vez que agrego la función
//import fs from 'fs'                const ejecutar = async().. porque tengo una versión desactualizada de node

const admin = require('firebase-admin')
const fs = require('fs')

const serviceAccount = JSON.parse(fs.readFileSync("./DB/coderhouse-2d177-firebase-adminsdk-n6zja-982be2c8c7.json", 'utf8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const asObj = doc => ({ id: doc.id, ...doc.data() })

console.log('Base Firebase conectada!')

const db = admin.firestore();
const dbNombres = db.collection('nombres')

const ejecutar = async() => {

    const guardado = await dbNombres.add({ nombre: 'pepe' });
    console.log(guardado.id)

    const doc = await dbNombres.doc(guardado.id).get();
    // console.log(doc)
    console.dir(asObj(doc))

    const result = []
    const snapshot = await dbNombres.get();
    snapshot.forEach(doc => {
        result.push(asObj(doc))
    })
    console.dir(result)

    await dbNombres.doc(guardado.id).set({ nombre: 'papa' });
    console.dir(asObj(await dbNombres.doc(guardado.id).get()))
}
ejecutar()
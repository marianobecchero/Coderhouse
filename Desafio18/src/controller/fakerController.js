const faker = require('faker')
faker.locale = 'es'

const CANT_PROD_DEFAULT = 5

function crearCombinacionAlAzar() {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

function generarNProductos(req, res, next) {
    const productos = []
    for (let i = 0; i < CANT_PROD_DEFAULT; i++) {
        productos.push(crearCombinacionAlAzar())
    }
    res.json(productos)
}

module.exports = {generarNProductos}

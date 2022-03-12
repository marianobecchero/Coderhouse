const axios = require('axios')

console.log('Test 1')

const listarProductos = async() => {
    const products = await axios.get('http://localhost:8080/api/productos/getAllProducts')
    .then(function (response){
        if (response.data.length > 0){
            console.log('Test OK')
        } else {
            console.log("Test Fallido")
        }
    })
    .catch(function(error){
        console.log(error)
    })

} 
listarProductos()

console.log('\n Test 2')

const crearProducto = async() => {
    const newProduct = {
        id: `${Date.now()}`,
        title: 'Auto',
        price: '10000',
        thumbnail: '-',
    }

    const product = await axios.get('http://localhost:8080/api/productos/createProduct')
    .then(function (response){
        if (response.data.length > 0){
            console.log('Test OK')
        } else {
            console.log("Test Fallido")
        }
    })
    .catch(function(error){
        console.log(error)
    })
}
crearProducto()
const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

//------------------------------------
const nombreProductos = productos.map(producto => producto.nombre);

function getNombreProductos (productos){
    const nombres = []
    for (const producto of productos) {
        nombres.push(producto.nombre)
    }
    return nombres.join(', ')
}

//--------------------------------------

const total = productos.reduce((acum, prod) => prod.precio + acum, 0);

function getPrecioTotal(productos){
    let precio = 0;
    for (i=0; i < productos.length; i++){
        precio += productos[i].precio;
    }
    return precio;
}

function getPrecioTotalForEach(productos){
    let precio = 0;
    for (const producto of productos){
        precio += producto.precio;
    }
    return precio;
}

//-------------------------------------------------

function getPrecioPromedio(productos){
    return total / productos.length;
}

//-------------------------------------------------

const menorPrecio = productos.reduce((min, curr) => (curr.precio < min.precio ? curr : min), productos[0]);

function getMenorPrecio(productos){
    let min = productos[ 0 ].precio
    let prod = productos[ 0 ]
    for (const producto of productos) {
        if (producto.precio < min) {
            min = producto.precio
            prod = producto
        }
    }
    return prod
}

//---------------------------------------------------------

const mayorPrecio = productos.reduce((max, curr) => (curr.precio > max.precio ? curr : max), productos[0]);

function getMayorPrecio(productos){
    let max = productos[ 0 ].precio
    let prod = productos[ 0 ]
    for (const producto of productos) {
        if (producto.precio > max) {
            max = producto.precio
            prod = producto
        }
    }
    return prod
}

//---------------------------------------------

function to2decimales(valor) {
    return Number(valor.toFixed(2))
}

const info = {
    nombres: getNombreProductos(productos),
    precioTotal: to2decimales(getPrecioTotal(productos)),
    precioTotalForEach: to2decimales(getPrecioTotalForEach(productos)),
    precioPromedio: to2decimales(getPrecioPromedio(productos)),
    precioMinimo: getMenorPrecio(productos),
    precioMayor: getMayorPrecio(productos)
}


console.log(info);

// const moment = require('moment');   
// function getEdad(){
//     const fechaNac = 1992/04/08;

//     return moment().diff(fechaNac, 'years',false);
// }

// console.log(getEdad());
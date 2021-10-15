const {Contenedor} = require('./Contenedor');
  

const contenedor = new Contenedor("Productos.txt");

const test = async() =>{
    console.log(await contenedor.getAll());
    console.log(await contenedor.getAllNombreProductos())
}

test();
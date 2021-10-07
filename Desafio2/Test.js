const {Contenedor} = require('./Contenedor');
  

const contenedor = new Contenedor("Productos.txt");

const test = async() =>{
    console.log(await contenedor.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        }));
    console.log(await contenedor.getById(2));
    await contenedor.deleteById(5);
    await contenedor.deleteAll();
    console.log(await contenedor.getAll());
}

test();
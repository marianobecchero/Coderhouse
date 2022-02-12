const nombreUsuario = document.getElementById('usuario')

// obtengo el email para el saludo
const login = async () => {
    const request = await fetch('/auth')
    const res = await request.json()
  
    nombreUsuario.innerHTML = res.nombre
} 
login()

const cargarProductos = async() => {
    const request = await fetch('/api/productos')
    const productos = await request.json()

    // busco la plantilla del servidor
    const recursoRemoto = await fetch('views/productos.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con los productos recibidas
    const html = functionTemplate({ productos })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('productos').innerHTML = html
}
cargarProductos()


const formProducto = document.getElementById('formProducto')
formProducto.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    // armo el producto extrayendo los datos de los campos del formulario
    

    const deleteProducto = async () => {   

        let response = await fetch(`/api/productos/${formProducto[ 0 ].value}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        //body: JSON.stringify(producto)
      });

      let result = await response.json();
      alert(result.message);

      cargarProductos()
      
      
    } 
    deleteProducto()

    

    // limpio el contenido de los campos del formulario
    formProducto.reset()
})
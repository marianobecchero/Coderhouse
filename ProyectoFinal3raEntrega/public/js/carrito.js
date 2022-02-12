const nombreUsuario = document.getElementById('usuario')

// obtengo el email para el saludo
const login = async () => {
    const request = await fetch('/auth')
    const res = await request.json()
  
    nombreUsuario.innerHTML = res.nombre
} 
login()

const cargarCarrito = async() => {
    const requestAuth = await fetch('/auth')
    const resAuth = await requestAuth.json()
  
    const request = await fetch(`/api/carritos/${resAuth.id}/productos`)
    const productos = await request.json()
  
    // busco la plantilla del servidor
    const recursoRemoto = await fetch('views/carrito.hbs')
  
    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()
  
    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)
  
    // relleno la plantilla con los productos recibidas
    const html = functionTemplate({ productos })
  
    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('carrito').innerHTML = html
  }
  cargarCarrito()

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

    const addProducto = async () => { 

        const producto = {
            id: formProducto[ 0 ].value
        }
        
        const requestAuth = await fetch('/auth')
        const resAuth = await requestAuth.json()

        let response = await fetch(`/api/carritos/${resAuth.id}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(producto)
      });

      let result = await response.json();
      alert(result.message);

      cargarCarrito()
      
      
    } 
    addProducto()

    // limpio el contenido de los campos del formulario
    formProducto.reset()
})




const formEliminarProducto = document.getElementById('formEliminarProducto')
formEliminarProducto.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    const deleteProducto = async () => { 

        const producto = {
            id: formEliminarProducto[ 0 ].value
        }
        
        const requestAuth = await fetch('/auth')
        const resAuth = await requestAuth.json()

        let response = await fetch(`/api/carritos/${resAuth.id}/productos/${producto.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        //body: JSON.stringify(producto)
      });

      let result = await response.json();
      alert(result.message);

      cargarCarrito()
      
      
    } 
    deleteProducto()

    // limpio el contenido de los campos del formulario
    formEliminarProducto.reset()
})



const formVaciarCarrito = document.getElementById('formVaciarCarrito')
formVaciarCarrito.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    const vaciarCarrito = async () => { 
        
        const requestAuth = await fetch('/auth')
        const resAuth = await requestAuth.json()

        let response = await fetch(`/api/carritos/${resAuth.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        //body: JSON.stringify(producto)
      });

      let result = await response.json();
      alert(result.message);

      cargarCarrito()
      
      
    } 
    vaciarCarrito()

})


const formEnviarPedido = document.getElementById('formEnviarPedido')
formEnviarPedido.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    alert('Pedido enviado a administracion');

    const enviarPedido = async () => { 
        
        const requestAuth = await fetch('/auth')
        const resAuth = await requestAuth.json()

        await fetch(`/api/carritos/${resAuth.id}/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(resAuth)
      });

      cargarCarrito()


      
      
    } 
    enviarPedido()

})
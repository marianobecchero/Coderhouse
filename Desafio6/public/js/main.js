const socket = io.connect();

/*socket.on('productos', data => {
    



    console.log(data)
    renderProductos(data)
  })*/

  // Metodo para agregar mensajes
/*const addPrducto = () => {
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('nuevoProducto', mensaje);

    // Limpiamos los campos de texto
    document.getElementById('title').value = ''
    document.getElementById('price').value = ''
    document.getElementById('thumbnail').value = ''
    return false
}

    // Metodo que me renderiza los mensajes en el DOM
const renderProductos = (productos) => {
    const html = productos.map((element, index) => {
        return (`
        <div>
            <strong>${index} - ${element.title}</strong>: 
            <em>${element.price}</em> 
        </div>
        `)
    }).join(' ')

    console.log(html)

    document.getElementById('productos').innerHTML = html;
}*/

// agrego manejador de eventos de tipo 'productos'
socket.on('productos', manejarEventoProductos);

async function manejarEventoProductos(productos) {
    //console.log(productos)

    // busco la plantilla del servidor
    const recursoRemoto = await fetch('views/productos.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con las personas recibidas
    const html = functionTemplate({ productos })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('productos').innerHTML = html
}


const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    // armo el producto extrayendo los datos de los campos del formulario

    document.getElementById('txtTitle').value
    const producto = {
        title: formAgregarProducto[ 0 ].value, // document.getElementById('txtTitle').value
        price: formAgregarProducto[ 1 ].value, // document.getElementById('txtPrice').value
        thumbnail: formAgregarProducto[ 2 ].value
    }

    // envio la persona al servidor via socket
    socket.emit('add', producto);

    // limpio el contenido de los campos del formulario
    formAgregarProducto.reset()
})


/*socket.on('mensajes', data => {
    renderMensajes(data)
})

// Metodo que me renderiza los mensajes en el DOM
const renderMensajes = (mensajes) => {
    const html = mensajes.map((element, index) => {
      return (`
        <div>
           <strong>${element.email}</strong>: 
           <em>${element.fecha}</em> 
           <em>${element.mensaje}</em> 
        </div>
        `)
    }).join(' ')
  
    console.log(html)
  
    document.getElementById('mensajes').innerHTML = html;
  }*/


  socket.on('mensajes', manejarEventoMensajes);

async function manejarEventoMensajes(mensajes) {
    //console.log(productos)

    // busco la plantilla del servidor
    const recursoRemoto = await fetch('views/mensajes.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con las personas recibidas
    const html = functionTemplate({ mensajes })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('mensajes').innerHTML = html
}

const formMensajes = document.getElementById('formMensajes')
formMensajes.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    // armo el producto extrayendo los datos de los campos del formulario

    document.getElementById('txtEmail').value
    const mensaje = {
        email: formMensajes[ 0 ].value,
        fecha: Date.now(),
        mensaje: formMensajes[ 1 ].value
    }

    // envio la persona al servidor via socket
    socket.emit('nuevoMensaje', mensaje);

    // limpio el contenido de los campos del formulario
    formMensajes.reset()
})
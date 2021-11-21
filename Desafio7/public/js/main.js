const socket = io.connect();

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

    // renderizo la fecha
    let fecha = new Date()

    // armo el producto extrayendo los datos de los campos del formulario

    document.getElementById('txtEmail').value
    const mensaje = {
        email: formMensajes[ 0 ].value,
        fecha: fecha.toISOString(),
        mensaje: formMensajes[ 1 ].value
    }

    // envio la persona al servidor via socket
    socket.emit('nuevoMensaje', mensaje);

    // limpio el contenido de los campos del formulario
    formMensajes.reset()
})
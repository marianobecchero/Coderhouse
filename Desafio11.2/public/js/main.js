const socket = io.connect();

// obtengo el email para el saludo
const login = async () => {
  const request = await fetch('/auth')
  const res = await request.json()

  //console.log(res)

  manejarEventoSession(res.email)
}

login()

/*1 const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// Definimos esquemas
const authorSchema = new schema.Entity('author');

const messageSchema = new schema.Entity('messages', {
  author: authorSchema,
});

const arrMessage = [messageSchema];*/

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
    /*2 const normalizedMessages = desnormalizacion(mensajes)

    const messagesDenormalized = []

    for(let dato of normalizedMessages){
      console.log(dato)
      messagesDenormalized.push({
        email: dato.author.id,
        fecha: dato.fecha,
        mensaje: dato.mensaje
    })
    }*/
    
    // busco la plantilla del servidor
    const recursoRemoto = await fetch('views/mensajes.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con las personas recibidas
    //3 const html = functionTemplate({ messagesDenormalized })
    const html = functionTemplate({ mensajes })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('mensajes').innerHTML = html
}

const formAgregarMensaje = document.getElementById('formAgregarMensaje')
formAgregarMensaje.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()
  
    // renderizo la fecha
    let fecha = new Date()

    // armo el producto extrayendo los datos de los campos del formulario

    /*4 const mensaje = {
        author: {
          id: document.getElementById('txtEmail').value,
          nombre: document.getElementById('txtNombre').value,
          apellido: document.getElementById('txtApellido').value,
          edad: document.getElementById('txtEdad').value,
          alias: document.getElementById('txtAlias').value,
          avatar: document.getElementById('txtAvatar').value,
        },
        mensaje: document.getElementById('txtMsj').value,
        fecha: fecha.toLocaleString(),
      }*/
      const mensaje = {
        id: `${Date.now()}`,
        email: document.getElementById('txtEmail').value,
        nombre: document.getElementById('txtNombre').value,
        apellido: document.getElementById('txtApellido').value,
        edad: document.getElementById('txtEdad').value,
        alias: document.getElementById('txtAlias').value,
        avatar: document.getElementById('txtAvatar').value,
        mensaje: document.getElementById('txtMsj').value,
        fecha: fecha.toLocaleString()
      }

      
        // envio la persona al servidor via socket
    socket.emit('nuevoMensaje', mensaje);

    // limpio el contenido de los campos del formulario
    formAgregarMensaje.reset()
    
})

async function manejarEventoSession(email) {

  // busco la plantilla del servidor
  const recursoRemoto = await fetch('views/session.hbs')

  //extraigo el texto de la respuesta del servidor
  const textoPlantilla = await recursoRemoto.text()

  //armo el template con handlebars
  const functionTemplate = Handlebars.compile(textoPlantilla)

  // relleno la plantilla con las personas recibidas
  const html = functionTemplate({ email })

  // reemplazo el contenido del navegador con los nuevos datos
  document.getElementById('session').innerHTML = html

}

const formSession = document.getElementById('formSession')
formSession.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

  const logout = async() => {

    await fetch('/logout')

    window.location.href = "/"

  }
  logout()
})

/*5 function desnormalizacion(normalizedData) {
  const denormalizedData = denormalize(
    normalizedData.result,
    [messageSchema],
    normalizedData.entities
  )
  
    let comprimido = Number(JSON.stringify(normalizedData).length)
    let descomprimido = Number(JSON.stringify(denormalizedData).length)
    actualizarCompresion(comprimido, descomprimido)

    return denormalizedData;
  }

  function actualizarCompresion(comprimido, descomprimido) {
    const porcentaje = Math.round(((descomprimido / comprimido) * 100) - 100)
    document.getElementById('txtTitulo').innerHTML = `Centro de mensajes (Compresión: ${porcentaje}%)`;
  }*/


  
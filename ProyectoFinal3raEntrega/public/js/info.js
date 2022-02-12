const nombreUsuario = document.getElementById('usuario')
const photo = document.getElementById('photo')

// obtengo el email para el saludo
const login = async () => {
    const request = await fetch('/auth')
    const res = await request.json()
  
    nombreUsuario.innerHTML = res.nombre


} 
login()



const info = async() => {

    const request = await fetch(`/getInfo`)
    const usuario = await request.json()

    console.log(usuario)

    // busco la plantilla del servidor
    const recursoRemoto = await fetch('views/info.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con las personas recibidas
    const html = functionTemplate({ usuario })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('info').innerHTML = html

    photo.src = usuario.photo
}
info()


//photo.src = '../uploads/photo.png'
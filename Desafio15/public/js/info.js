const info = async () => {
    const request = await fetch('/info/getInfo')
    const res = await request.json()
  
    manejarEventoInfo(res)
  }
  
  info()

async function manejarEventoInfo(info) {

    // busco la plantilla del servidor
    const recursoRemoto = await fetch('views/info.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con las personas recibidas
    const html = functionTemplate({ info })

    // reemplazo el contenido del navegador con los nuevos datos
    document.getElementById('info').innerHTML = html
}
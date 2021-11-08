// Almacenamiento de mensajes

const mensajes = []
  
  const getMensajes = () => mensajes;

  const saveMensaje = mensaje => {
    mensajes.push(mensaje);
  }
  
  module.exports = {
    getMensajes,
    saveMensaje
  }
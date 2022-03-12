const { Message } = require('../business/Message.js')
const { Author } = require('../business/Author.js')

function asModel(data) {
  const author = new Author(data.author);
  const message = new Message(data.id, data.message, data.date, author );
  return message;
}

function asModels(data) {
  const messages = data.map((d) => asModel(d));
  return messages;
}

function asDto(message) {
  const dto = {
    author: {
      id: message.author.id,
      nombre: message.author.nombre,
      apellido: message.author.apellido,
      edad: message.author.edad,
      alias: message.author.alias,
      avatar: message.author.avatar,
    },
    message: message.message,
    date: message.date,
    id: message.id,
  };
  return dto;
}

function asDtos(messages) {
  const dtos = messages.map((d) => asDto(d));
  return dtos;
}

module.exports =  { asModel, asModels, asDto, asDtos };
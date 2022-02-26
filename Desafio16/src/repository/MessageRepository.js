const { asDto, asModels, asDtos } = require('../mapper/messageMapper.js')
const { MessageDao } = require('../dao/MessageDaoFactory.js')

class MessageRepository {
  #messageDao;

  constructor() {
    this.#messageDao = MessageDao;
  }

  async getAllMessages() {
    let dtos = await this.#messageDao.getAll();
    const messages = asModels(dtos);
    dtos = asDtos(messages);
    return dtos;
  }

  async createMessage(message) {
    const dto = asDto(message);
    return await this.#messageDao.saveMensaje(dto);
  }
}

module.exports =  { MessageRepository }
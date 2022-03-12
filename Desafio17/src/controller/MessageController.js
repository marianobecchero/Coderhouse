const { MessageRepository } = require('../repository/MessageRepository.js')

class MessageController {
  constructor() {
    this.messageRepository = new MessageRepository();
  }

  createMessage = async (newMessage) => {
    await this.messageRepository.createMessage(newMessage);
  };

  getAllMessages = async () => {
    const messages = await this.messageRepository.getAllMessages();
    return messages;
  };
}

module.exports = { MessageController }
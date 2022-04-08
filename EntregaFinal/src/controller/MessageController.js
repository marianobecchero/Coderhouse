const { MessageDao } = require('../dao/MessageDaoFactory.js')
const { Message } = require('../business/Message.js')

class MessageController {
  constructor() {
  }

  newMessage = async (newMessage) => {
    const { email, text } = newMessage;
    const date = Date()
    const message = new Message(email, date, text);
    if (message) {
      await MessageDao.save(message);
    }
  };

  getAllMessages = async () => {
    const messages = await MessageDao.getAll();
    return messages;
  };
}

module.exports = { MessageController }
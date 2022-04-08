const { MessageDao } = require('../dao/MessageDaoFactory.js')
const { Message } = require('../business/Message.js')

class MessageController {
  constructor() {
  }

  newMessage = async (newMessage) => {
    const { username, text } = newMessage;
    const date = Date()
    const message = new Message(username, date, text);
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
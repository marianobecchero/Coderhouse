const { UserDao } = require('../dao/UserDaoFactory.js')
const { User } = require('../business/User.js')
const bcrypt = require('bcrypt')

class UserController {
  constructor() {
    //this.product = new Product();
  }

  createUser = async (username, password) => {
    //logger.info(`Attempting to create new product`);
    const user = await UserDao.getByUsername(username)
    if (!user) {
      const newUser = new User(`${Date.now()}`, username, createHashPassword(password));
      await UserDao.save(newUser)
      return newUser
    } else {
        return false
    }
  };

  getLogin = async (username, password) => {
    //logger.info(`Attempting get all messages`);
    const user = await UserDao.getByUsername(username);

    if (!user) {
      return false
    }

    if (!isValidPassword(user, password)) {
      return false
    }

    return user;
  };

  getById = async(id) => {
    const user = await UserDao.getById(id)
    return user
  }

}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password)
}

function createHashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

module.exports = { UserController }
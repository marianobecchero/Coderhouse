const { UserDao } = require('../dao/UserDaoFactory.js')
const { User } = require('../business/User.js')
const { CartController } = require('./CartController')
const bcrypt = require('bcrypt')
const { logger } = require('../logger')

const cartController = new CartController()

class UserController {
  constructor() {
    //this.product = new Product();
  }

  createUser = async (req, res) => {
    const { surname, name, username, password, cellphone } = req.body
    const user = await UserDao.getByUsername(username)
    if (!user) {
      const newUser = new User(surname, name, username, createHashPassword(password), cellphone, '-');
      await UserDao.save(newUser)

      //CREO EL CARRITO
      const resultUser = await UserDao.getByUsername(newUser.username)
      await cartController.createCart(resultUser._id)

      logger.info(`${newUser.username} signed up`)
      return res.status(200).json({ success: 'Successfully registered user' })
    } else {
      logger.error(`${user.username} is registered`)
      return res.status(400).json({ error: 'Username already exist' });
    }
  }

  getLogin = async (username, password) => {
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

  upload = async (req, res) => {
    const idUser = req.params.idUser
    const photoURL = req.file.path
    const result = await UserDao.upload(idUser, photoURL)
    if (result != photoURL){
      logger.error(`${idUser} An error occurred while uploading the file`)
      return res.status(400).json({ error: 'An error occurred while uploading the file' })
  } else {
    logger.info(`${idUser} The file was uploaded successfully`)
      return res.status(200).json({ success: 'The file was uploaded successfully' })
  }
}

}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password)
}

function createHashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

module.exports = { UserController }
const { UserDao } = require('../dao/UserDaoFactory.js')
const { User } = require('../business/User.js')
const { CartController } = require('./CartController')
const bcrypt = require('bcrypt')

const cartController = new CartController()

class UserController {
  constructor() {
    //this.product = new Product();
  }

  createUser = async (surname, name, username, password, cellphone, photoURL) => {
    const user = await UserDao.getByUsername(username)
    if (!user) {
      const newUser = new User(surname, name, username, createHashPassword(password), cellphone, photoURL);
      const result = await UserDao.save(newUser)

      //CREO EL CARRITO
      const resultUser = await UserDao.getByUsername(newUser.username)
      await cartController.createCart(resultUser._id)

      return result
    } else {
        return false
    }
  };

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

  upload = async (idUser, photoURL) => {
    const result = await UserDao.upload(idUser, photoURL)
    if (result != photoURL){
      return { error: 'An error occurred while uploading the file' }
  } else {
      return { success: 'The file was uploaded successfully' }
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
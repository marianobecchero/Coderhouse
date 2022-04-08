const { CartDao } = require('../dao/CartDaoFactory.js')
const { ProductDao } = require('../dao/ProductDaoFactory.js')
const { OrderDao } = require('../dao/OrderDaoFactory.js')
const { Cart } = require('../business/Cart')
const { Order } = require('../business/Order')
const { newEmail } = require('../nodemailer')

class CartController {
  constructor() {
    //this.product = new Product();
  }

  createCart = async (idUser) => {
      const newCart = new Cart(idUser, []);
      const cart = await CartDao.save(newCart)
      if (cart){
        return true
      } else {
        return false
      }
  }

  addProduct = async (idCart, idProduct) => {
      const cart = await CartDao.getById(idCart)
      const product = await ProductDao.getById(idProduct)

      if(cart){
          if (product){
            const products = cart.products
            const index = products.findIndex(prod => prod.idProduct == idProduct)
            if (index >= 0){
                products[index].amount++
            } else {
                products.push({
                    idProduct: idProduct,
                    amount: 1
                })
            }

            //cart.products = products

            const newCart = new Cart(cart.idUser, products)
            const result = CartDao.modifyCart(newCart)

            if (result){
                return { success: 'The product has been loaded successfully' }
            } else {
                return { error: 'The product has not been loaded' }
            }

            

          } else {
            return { error: 'The product does not exist' }
          }
      } else {
          return { error: 'The cart does not exist' }
      }
  }

  deleteProduct = async (idCart, idProduct) => {
    const cart = await CartDao.getById(idCart)

    if(cart){
        const products = cart.products
        const index = products.findIndex(prod => prod.idProduct == idProduct)
        if (index >= 0){
            if (products[index].amount == 1){
                products.splice(index, 1)
            } else {
                products[index].amount--
            }
        } else {
            return { error: 'The product does not exist in the cart' }
        }

        const newCart = new Cart(cart.idUser, products)
        const result = CartDao.modifyCart(newCart)

        if (result){
            return { success: 'The product has been successfully removed' }
        } else {
            return { error: 'The product has not been removed' }
        }

    } else {
        return { error: 'The cart does not exist' }
    }
}

buy = async (idCart) => {
    const cart = await CartDao.getById(idCart)
    const order = new Order(Date(), cart.idUser, cart.products)
    const result = await CartDao.buy(idCart)
    if (cart.products.length > 0){
        await OrderDao.save(order)
        await newEmail(order)
    }
    return result
}

}

module.exports = { CartController }
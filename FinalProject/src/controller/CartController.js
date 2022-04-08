const { CartDao } = require('../dao/CartDaoFactory.js')
const { ProductDao } = require('../dao/ProductDaoFactory.js')
const { OrderDao } = require('../dao/OrderDaoFactory.js')
const { Cart } = require('../business/Cart')
const { Order } = require('../business/Order')
const { newEmail } = require('../nodemailer')
const { logger } = require('../logger.js')

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

  addProduct = async (req, res) => {
      const idCart = req.params.idCart
      const idProduct = req.params.idProduct
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

            const newCart = new Cart(cart.idUser, products)
            const result = CartDao.modifyCart(newCart)

            if (result){
                return res.status(200).json({ success: 'The product has been loaded successfully' })
            } else {
                return res.status(400).json({ error: 'The product has not been loaded' })
            }

            

          } else {
            return res.status(400).json({ error: 'The product does not exist' })
          }
      } else {
        return res.status(400).json({ error: 'The cart does not exist' })
      }
  }

  deleteProduct = async (req, res) => {
    const idCart = req.params.idCart
    const idProduct = req.params.idProduct
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
            return res.status(400).json({ error: 'The product does not exist in the cart' })
        }

        const newCart = new Cart(cart.idUser, products)
        const result = CartDao.modifyCart(newCart)

        if (result){
            return res.status(200).json({ success: 'The product has been successfully removed' })
        } else {
            return res.status(400).json({ error: 'The product has not been removed' })
        }

    } else {
        return res.status(400).json({ error: 'The cart does not exist' })
    }
}

buy = async (req, res) => {
    const idCart = req.params.idCart
    const cart = await CartDao.getById(idCart)
    if (cart){
        const order = new Order(Date(), cart.idUser, cart.products)
        const result = await CartDao.buy(idCart)
        if (cart.products.length > 0){
            await OrderDao.save(order)
            await newEmail(order)
        }
        logger.info(`New order by cart ${idCart}`)
        return res.status(200).json( result )
    } else {
        logger.error(`The cart does not exist`)
        return res.status(400).json({ error: 'The cart does not exist' })
    }
    
}

}

module.exports = { CartController }
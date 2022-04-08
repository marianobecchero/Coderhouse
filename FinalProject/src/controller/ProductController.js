const { ProductDao } = require('../dao/ProductDaoFactory.js')
const { Product } = require('../business/Product')
const { logger } = require('../logger')

class ProductController {
  constructor() {
    //this.product = new Product();
  }

  createProduct = async (req, res) => {
      const { title, description, price } = req.body
      const newProduct = new Product(title, description, price, '-');
      const product = await ProductDao.save(newProduct)
      if (product){
        logger.info(`${product.title} loaded correctly`)
        return res.status(200).json({ success: 'Product loaded successfully' })
      } else {
        logger.error(`There was a problem loading ${product.title}`)
        return res.status(400).json({ error: 'There was a problem loading the product' })
      }
  };

  deleteProduct = async (req, res) => {
      const id = req.params.idProduct
      const result = await ProductDao.delete(id)
      if (id == result){
        logger.info(`Product ${id} removed successfully`)
        return res.status(200).json({ success: 'Product removed successfully' })
      } else {
        logger.error(`There was a problem removing the product ${id}`)
        return res.status(400).json({ error: 'There was a problem removing the product' })
      }
  }

  getAllProducts = async(req, res) => {
      const products = await ProductDao.getAll()
      if (products){
        return res.status(200).json( products )
      } else {
        return res.status(400).json({ error: 'There was a problem loading the products' })
      }
  }

  updateProduct = async (req, res) => {
      const id = req.params.idProduct
      const { title, description, price } = req.body
      const newProduct = new Product(title, description, price, '-');
      const product = await ProductDao.update(id, newProduct)
      if (product){
        logger.info(`${product.title} updated successfully`)
        return res.status(200).json({ success: 'Product updated successfully' })
      } else {
        logger.error(`There was a problem updating the product ${id}`)
        return res.status(400).json({ error: 'There was a problem updating the product' })
      }
  }

  upload = async (req, res) => {
    const idProduct = req.params.idProduct
    const photoURL = req.file.path
    const result = await ProductDao.upload(idProduct, photoURL)
    if (result != photoURL){
      logger.error(`An error occurred while uploading the file`)
      return res.status(400).json({ error: 'An error occurred while uploading the file' })
  } else {
      logger.info(`The file was uploaded successfully`)
      return res.status(200).json({ success: 'The file was uploaded successfully' })
  }
}
  

}

module.exports = { ProductController }
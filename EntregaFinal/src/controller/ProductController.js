const { ProductDao } = require('../dao/ProductDaoFactory.js')
const { Product } = require('../business/Product')

class ProductController {
  constructor() {
    //this.product = new Product();
  }

  createProduct = async (title, description, price, photoURL) => {
      const newProduct = new Product(title, description, price, photoURL);
      const product = await ProductDao.save(newProduct)
      if (product){
        return { success: 'Product loaded successfully' }
      } else {
        return { error: 'There was a problem loading the product' }
      }
  };

  deleteProduct = async (id) => {
      const result = await ProductDao.delete(id)
      if (id == result){
        return { success: 'Product removed successfully' }
      } else {
        return { error: 'There was a problem removing the product' }
      }
  }

  getAllProducts = async() => {
      const products = await ProductDao.getAll()
      if (products){
        return products
      } else {
        return { error: 'There was a problem loading the products' }
      }
  }

  updateProduct = async (id, title, description, price, photoURL) => {
      const newProduct = new Product(title, description, price, photoURL);
      const product = await ProductDao.update(id, newProduct)
      if (product){
        return { success: 'Product updated successfully' }
      } else {
        return { error: 'There was a problem updating the product' }
      }
  };

}

module.exports = { ProductController }
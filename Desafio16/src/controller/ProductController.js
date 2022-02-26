const { ProductDao } = require('../dao/ProductDaoFactory.js')
const { Product } = require('../business/Product.js')

class ProductController {
  constructor() {
    //this.product = new Product();
  }

  createProduct = async (newProduct) => {
    //logger.info(`Attempting to create new product`);
    const { title, price, thumbnail } = newProduct;
    const product = new Product(title, price, thumbnail);
    if (product) {
      await ProductDao.save(product);
    }
  };

  getAllProducts = async () => {
    //logger.info(`Attempting get all messages`);
    const products = await ProductDao.getAll();
    return products;
  };
}

module.exports = { ProductController }
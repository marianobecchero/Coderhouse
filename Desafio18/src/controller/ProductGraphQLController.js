const { ProductDao } = require('../dao/ProductDaoFactory.js')
const { Product } = require('../business/Product.js')

class ProductGraphQLController {
  constructor() {}

  createProduct = async (data) => {
    const rawProduct = JSON.parse(JSON.stringify(data));
    const { id, title, price, thumbnail } = rawProduct.data;
    const newProduct = new Product(id, title, price, thumbnail);
    const product = await ProductDao.save(newProduct);
    if (product) {
      const producto = await ProductDao.getById(id);
      return producto;
    } else {
      return { error: 'error al guardar producto' };
    }
  };

  getAllProducts = async () => {
    const products = await ProductDao.getAll();
    console.log(products)
    return products;
  };
}

module.exports = { ProductGraphQLController }
const { ProductGraphQLController } = require('../controller/ProductGraphQLController.js') ;
const { buildSchema } =require('graphql')

const schema = buildSchema(`
    input ProductInput {
        id: String,
        title: String,
        price: Float,
        thumbnail: String
    }
    type Product {
        id: ID!
        title: String,
        price: Float,
        thumbnail: String
    }
    type Query {
        getAllProducts: [Product],
        getProductById (id: ID!): Product
    }
    type Mutation {
        createProduct (data: ProductInput): Product,
        updateProductById(id: ID!, data: ProductInput): Product,
        deleteProductById(id: ID!): Product
    }
`);

class ProductGraphQLRouter {
  constructor(graphqlHTTP) {
    this.graphqlHTTP = graphqlHTTP;
    const productController = new ProductGraphQLController();
    return this.graphqlHTTP({
      schema: schema,
      rootValue: {
        createProduct: productController.createProductController,
        getAllProducts: productController.getAllProductsController
      },
      graphiql: true,
    });
  }
}

module.exports = { ProductGraphQLRouter }
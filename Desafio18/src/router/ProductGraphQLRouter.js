const { ProductGraphQLController } = require('../controller/ProductGraphQLController.js') ;
const { buildSchema } =require('graphql')

const schema = buildSchema(`
    input ProductInput {
        id: String
        title: String
        price: Float
        thumbnail: String
    }
    type Product {
        id: String!
        title: String
        price: Float
        thumbnail: String
    }
    type Query {
        getAllProducts: [Product]
    }
    type Mutation {
        createProduct (data: ProductInput): Product
    }
`);

class ProductGraphQLRouter {
  constructor(graphqlHTTP) {
    this.graphqlHTTP = graphqlHTTP;
    const productController = new ProductGraphQLController();
    return this.graphqlHTTP({
      schema: schema,
      rootValue: {
        createProduct: productController.createProduct,
        getAllProducts: productController.getAllProducts
      },
      graphiql: true,
    });
  }
}

module.exports = { ProductGraphQLRouter }
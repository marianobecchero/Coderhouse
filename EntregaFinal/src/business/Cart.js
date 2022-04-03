class Cart {
    //#id;
    #idUser;
    #products = [];
    constructor(/*id,*/ idUser, products) {
      //this.id = this.setId(id);
      this.idUser = this.setIdUser(idUser);
      this.products = this.setProducts(products);
    }

    // setId(id) {
    //     if (id) {
    //       this.id = id;
    //       return id;
    //     } else {
    //       throw Error(`Missing field id for create product`);
    //     }
    //   }

    setIdUser(idUser) {
        if (idUser) {
          this.idUser = idUser;
          return idUser;
        } else {
          throw Error(`Missing field idUser for create cart`);
        }
      }

      setProducts(products) {
        if (products) {
          this.products = products;
          return products;
        } else {
          throw Error(`Missing field products for create cart`);
        }
      }
  
  }
  
module.exports = { Cart }
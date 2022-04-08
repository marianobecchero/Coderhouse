class Order {
    //#id;
    #fecha;
    #idUser;
    #products = [];
    constructor(/*id,*/ fecha, idUser, products) {
      //this.id = this.setId(id);
      this.fecha = this.setIdUser(fecha);
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

    setFecha(fecha) {
        if (fecha) {
          this.fecha = fecha;
          return fecha;
        } else {
          throw Error(`Missing field fecha for create order`);
        }
      }

    setIdUser(idUser) {
        if (idUser) {
          this.idUser = idUser;
          return idUser;
        } else {
          throw Error(`Missing field idUser for create order`);
        }
      }

      setProducts(products) {
        if (products) {
          this.products = products;
          return products;
        } else {
          throw Error(`Missing field products for create order`);
        }
      }
  
  }
  
module.exports = { Order }
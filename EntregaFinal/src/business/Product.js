class Product {
    //#id;
    #title;
    #description;
    #price;
    #photoURL;
    constructor(/*id,*/ title, description, price, photoURL) {
      //this.id = this.setId(id);
      this.title = this.setTitle(title);
      this.description = this.setDescription(description);
      this.price = this.setPrice(price);
      this.photoURL = this.setPhotoURL(photoURL);
    }

    // setId(id) {
    //     if (id) {
    //       this.id = id;
    //       return id;
    //     } else {
    //       throw Error(`Missing field id for create product`);
    //     }
    //   }

    setTitle(title) {
        if (title) {
          this.title = title;
          return title;
        } else {
          throw Error(`Missing field title for create product`);
        }
      }

      setDescription(description) {
        if (description) {
          this.description = description;
          return description;
        } else {
          throw Error(`Missing field description for create product`);
        }
      }
  
    setPrice(price) {
      if (price) {
        this.price = price;
        return price;
      } else {
        throw Error(`Missing field price for create product`);
      }
    }

    setPhotoURL(photoURL) {
        if (photoURL) {
          this.photoURL = photoURL;
          return photoURL;
        } else {
          throw Error(`Missing field photoURL for create product`);
        }
      }

  }
  
module.exports = { Product }
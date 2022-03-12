class Product {
    #id;
    #title;
    #price;
    #thumbnail;
    constructor(id, title, price, thumbnail) {
      this.id = this.setId(id);
      this.title = this.setTitle(title);
      this.price = this.setPrice(price);
      this.thumbnail = this.setThumbnail(thumbnail);
    }

    setId(id) {
      if (id) {
        this.id = id;
        return id;
      } else {
        throw Error(`Missing field id for create product`);
      }
    }
  
    setTitle(title) {
      if (title) {
        this.title = title;
        return title;
      } else {
        throw Error(`Missing field title for create product`);
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

    setThumbnail(thumbnail) {
      if (thumbnail) {
        this.thumbnail = thumbnail;
        return thumbnail;
      } else {
        throw Error(`Missing field thumbnail for create product`);
      }
    }
  }
  
module.exports = { Product }
class Product {
    #title;
    #price;
    #thumbnail;
    constructor(title, price, thumbnail) {
      this.title = this.setTitle(title);
      this.price = this.setPrice(price);
      this.thumbnail = this.setThumbnail(thumbnail);
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
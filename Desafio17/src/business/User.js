class User {
    #id;
    #username;
    #password;
    constructor(id, username, password) {
      this.id = this.setId(id);
      this.username = this.setUsername(username);
      this.password = this.setPassword(password);
    }

    setId(id) {
        if (id) {
          this.id = id;
          return id;
        } else {
          throw Error(`Missing field id for create product`);
        }
      }
  
    setUsername(username) {
      if (username) {
        this.username = username;
        return username;
      } else {
        throw Error(`Missing field username for create product`);
      }
    }

    setPassword(password) {
      if (password) {
        this.password = password;
        return password;
      } else {
        throw Error(`Missing field password for create product`);
      }
    }
  }
  
module.exports = { User }
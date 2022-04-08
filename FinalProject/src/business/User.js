class User {
    //#id;
    #surname;
    #name;
    #username;
    #password;
    #cellphone;
    #photoURL;
    constructor(/*id,*/ surname, name, username, password, cellphone, photoURL) {
      //this.id = this.setId(id);
      this.surname = this.setSurname(surname);
      this.name = this.setName(name);
      this.username = this.setUsername(username);
      this.password = this.setPassword(password);
      this.cellphone = this.setCellphone(cellphone);
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

    setSurname(surname) {
        if (surname) {
          this.surname = surname;
          return surname;
        } else {
          throw Error(`Missing field surname for create user`);
        }
      }

      setName(name) {
        if (name) {
          this.name = name;
          return name;
        } else {
          throw Error(`Missing field name for create user`);
        }
      }
  
    setUsername(username) {
      if (username) {
        this.username = username;
        return username;
      } else {
        throw Error(`Missing field username for create user`);
      }
    }

    setPassword(password) {
      if (password) {
        this.password = password;
        return password;
      } else {
        throw Error(`Missing field password for create user`);
      }
    }

    setCellphone(cellphone) {
        if (cellphone) {
          this.cellphone = cellphone;
          return cellphone;
        } else {
          throw Error(`Missing field cellphone for create user`);
        }
      }

      setPhotoURL(photoURL) {
        if (photoURL) {
          this.photoURL = photoURL;
          return photoURL;
        } else {
          throw Error(`Missing field photoURL for create user`);
        }
      }

  }
  
module.exports = { User }
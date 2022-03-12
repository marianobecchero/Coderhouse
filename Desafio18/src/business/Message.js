class Message {
    #id;
    #message;
    #date;
    #author;
    constructor(id, message, date, author) {
      // console.log(id)
      // console.log(message)
      // console.log(date)
      // console.log(author)
      this.id = this.setId(id);
      this.message = this.setMessage(message);
      this.date = this.setDate(date);
      this.author = this.setAuthor(author)
    }
  
    setId(id) {
      if (id) {
        this.id = id;
        return id;
      } else {
        throw Error(`Missing field id for create message`);
      }
    }

    setMessage(message) {
      if (message) {
        this.message = message;
        return message;
      } else {
        throw Error(`Missing field message for create message`);
      }
    }

    setDate(date) {
      if (date) {
        this.date = date;
        return date;
      } else {
        throw Error(`Missing field date for create message`);
      }
    }

    setAuthor(author) {
      if (author) {
        this.author = author;
        return author;
      } else {
        throw Error(`Missing field author for create message`);
      }
    }
  }
  
module.exports = { Message }
class Message {
    #username;
    #date;
    #text;
    constructor(username, date, text) {
      this.username = this.setUsername(username);
      this.date = this.setDate(date);
      this.text = this.setText(text)
    }
  
    setUsername(username) {
      if (username) {
        this.username = username;
        return username;
      } else {
        throw Error(`Missing field username for create message`);
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

    setText(text) {
      if (text) {
        this.text = text;
        return text;
      } else {
        throw Error(`Missing field text for create message`);
      }
    }
  }
  
module.exports = { Message }
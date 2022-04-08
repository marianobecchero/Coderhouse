class Message {
    #email;
    #date;
    #text;
    constructor(email, date, text) {
      this.email = this.setEmail(email);
      this.date = this.setDate(date);
      this.text = this.setText(text)
    }
  
    setEmail(email) {
      if (email) {
        this.email = email;
        return email;
      } else {
        throw Error(`Missing field email for create message`);
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
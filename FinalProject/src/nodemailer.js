const { createTransport } = require('nodemailer')
const { UserDao } = require('./dao/UserDaoFactory')
const { ProductDao } = require('./dao/ProductDaoFactory')

/* ------ ENVIO DE EMAIL CUANDO SE REALIZA LA COMPRA --------*/
const newEmail = async (order) => {
    const execute = async() => {
        const user = await UserDao.getById(order.idUser);
        let productsEmail = "CANTIDAD | PRODUCTO"

        for (const product of order.products){
            const prod = await ProductDao.getById(product.idProduct)
            productsEmail = productsEmail + "<br>"
            productsEmail = productsEmail + product.amount + " " + prod.title
        }

        sendEmail(user, productsEmail)

    }
    execute()
}

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'marianobecchero@gmail.com',
        pass: 'gfkmsjugcshurayo'
    }
  });

const sendEmail = async(user, products) => {
    try {
      const mailOptionsAdmin = {
        from: 'e-Commerce Becchero Mariano',
        to: 'marianobecchero@gmail.com',
        subject: `Nueva orden de compra de ${user.surname} ${user.name} - ${user.username}`,
        html: `<span>${products}</span>`
      }

      const mailOptionsUser = {
        from: 'e-Commerce Becchero Mariano',
        to: user.username,
        subject: `Se ha generado una nueva orden de compra`,
        html: `<span>${products}</span>`
      }
  
      await transporter.sendMail(mailOptionsAdmin)
      await transporter.sendMail(mailOptionsUser)
    } catch (error) {
      logger.error('ERROR: No se pudo enviar el email')
    }
  }
  
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

  module.exports = { newEmail }
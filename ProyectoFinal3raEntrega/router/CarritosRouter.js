//import { Router } from 'express';
//import { personasDao } from '../daos/personas/index.js'
const { Router } = require('express')
const { carritosDao } = require('../dao/carritos/index.js')
const { productosDao } = require('../dao/productos/index.js')
const { twilioDao } = require('../dao/twilio/index.js')
const { createTransport } = require('nodemailer')
const twilio = require('twilio')
const { logger } = require('../logger.js')

const carritosRouter = Router()

const esAdministrador = true

carritosRouter.get('/:id/productos', async (req, res) => {
    const execute = async() => {
        const idCarrito = req.params.id

        if (isNaN(idCarrito)){
            res.json({ message: 'Parámetro erróneo' })
        } else {
            const carrito = await carritosDao.getById(idCarrito)
            if (carrito == null){
                res.json({ message: `No existe el carrito con id ${idCarrito}` })
            } /*else if (carrito.productos.length == 0) {
                res.json({ message: 'El carrito no tiene productos' }) //Lo modifiqué en el ejercicio de la 3ra entrega para que me devuelva el array solo
            }*/ else {
                const productosCarrito = carrito.productos
                res.json(productosCarrito)
            }
        }
    }
    execute()
})

carritosRouter.post('/', async (req, res) => {
    const execute = async() => {
        const carrito = await carritosDao.save(req.body);
        res.json(carrito)
    }
    execute()
})

carritosRouter.post('/:id/productos', (req,res) => {
    const execute = async() => {
        const idCarrito = req.params.id
        const producto = req.body

        if (isNaN(idCarrito)){
            res.json({ message: 'Parámetro erróneo' }) 
        } else {
            const productoCarrito = await productosDao.getById(producto.id)
            if (productoCarrito == null){
                res.json({ message: `No se encontró el producto con id ${producto.id}` })
            } else {
                const carrito = await carritosDao.getById(idCarrito)
                if (carrito == null){
                    res.json({ message: `No se encontró el carrito con id ${idCarrito}` })
                } else {
                    carrito.productos.push(productoCarrito)
                    const carritoAgregado = await carritosDao.addProductoCarrito(carrito)
                    res.json(carritoAgregado)
                }
            }
        }

        
    }
    execute()
})

carritosRouter.delete('/:id', async (req, res) => {
    const execute = async() => {
        const carrito = await carritosDao.vaciarCarrito(req.params.id);
        res.json(carrito)
    }
    execute()
})

carritosRouter.delete('/:id/productos/:id_prod', (req,res) => {
    const execute = async() =>{
        const idCarrito = req.params.id
        const idProducto = req.params.id_prod

        if (isNaN(idCarrito) || isNaN(idProducto)){
            res.json({ message: 'Parámetro erróneo' })
        } else {
            const carrito = await carritosDao.getById(idCarrito)
            if (carrito == null){
                res.json({ message: `No se encontró el carrito con id ${idCarrito}` })
            } else {
                const indexProducto = carrito.productos.findIndex(obj => obj.id == idProducto)
                if (indexProducto == -1){
                    res.json({ message: `No se encontró el producto con id ${idProducto}` })
                } else {
                    carrito.productos.splice(indexProducto, 1)
                    const productoEliminar = await carritosDao.deleteProductoEnCarrito(carrito)
                    res.json(productoEliminar)
                }
            }
        } 
    }
    execute()
})


/* ------ ENVIO DE EMAIL, WHATSAPP Y SMS --------*/

//EMAIL
carritosRouter.post('/:id/enviar', async (req, res) => {
    const execute = async() => {
        const carrito = await carritosDao.getById(req.params.id);
        let productosEmail = "PRODUCTO | PRECIO"
        let productosWhatsapp = "PRODUCTO | PRECIO"

        if (carrito.productos.length > 0) {
            for (const producto of carrito.productos){
                productosEmail = productosEmail + "<br>"
                productosEmail = productosEmail + producto.nombre + " $" + producto.precio

                productosWhatsapp = productosWhatsapp + "\n"
                productosWhatsapp = productosWhatsapp + producto.nombre + " $" + producto.precio
            }
    
            sendEmail(req.body, productosEmail)
            sendWhatsapp(req.body, productosWhatsapp)
            sendSMS(req.body)
    
            await carritosDao.vaciarCarrito(req.params.id);
        }
        

        res.json(productosEmail)

    }
    execute()
})

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'marianobecchero@gmail.com',
        pass: 'gfkmsjugcshurayo'
    }
  });

  const sendEmail = async(usuario, productos) => {
    try {
      const mailOptions = {
        from: 'Servidor Node.js',
        to: process.env.EMAIL,
        subject: `Nuevo pedido de ${usuario.nombre} - ${usuario.username}`,
        html: `<span>${productos}</span>`
      }
  
      const info = await transporter.sendMail(mailOptions)
      //console.log(info)
    } catch (error) {
      logger.error('ERROR: No se pudo enviar el email')
    }
  }
  
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//WHATSAPP Y SMS

const accountSid = "ACa0c72e60267aa1ea3bb9b6a2731862e7"
const authToken = "bdc4ae49d9211850e6e16097d89d58d3"

const client = twilio(accountSid, authToken)

const sendWhatsapp = async(usuario, productos) => {
    try {
        const options = {
            body: `Nuevo pedido de ${usuario.nombre} - ${usuario.username} \n ${productos}`,
            from: `whatsapp:+14155238886`,
            to: `whatsapp:${process.env.WHATSAPP}`
        }

        const client = twilio(accountSid, authToken)

        const message = await client.messages.create(options)
        //console.log(message)
    } catch (error) {
        logger.error('ERROR: No se pudo enviar el whatsapp')
    }
}

const sendSMS = async(usuario) => {
    try {
        const options = {
            body: 'Su pedido ha sido recibido y se encuentra en proceso de preparacion',
            from: '+18507864089',
            to: usuario.nroTelefono
        }

        const message = await client.messages.create(options)
        //console.log(message)
    } catch (error) {
        logger.error('ERROR: No se pudo enviar el SMS')
    }
}



exports.carritosRouter = carritosRouter;
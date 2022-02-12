const { Router } = require('express')
const session = require('express-session')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { usuariosDao } = require('../dao/usuarios/index')
const { carritosDao } = require('../dao/carritos/index')
const bcrypt = require('bcrypt')
const multer = require('multer')
const { createTransport } = require('nodemailer')
require('dotenv').config()
const fs = require('fs')

const sesionesRouter = Router()

/* --------------------- MIDDLEWARE --------------------------- */

sesionesRouter.use(
  session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
)

sesionesRouter.use(passport.initialize())
sesionesRouter.use(passport.session())

/* ------------------ PASSPORT -------------------- */

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {

      const usuario = await usuariosDao.getByUsername(username)
      if (usuario) {
        return done(null, false)
      }

      //const fecha = new Date()
      //const idUsuario = fecha.toISOString()

      const user = {
        //id: idUsuario,
        username: username,
        password: createHashPassword(password),
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        edad: req.body.edad,
        nroTelefono: req.body.nroTelefono,
        //foto: req.body.foto
      }

      const res = await usuariosDao.saveUser(user)

      saveCarrito()
      sendEmail(user)
      //upload.single('myFile')


      return done(null, res)
    }
  )
)

passport.use(
    'login',
    new LocalStrategy( async(username, password, done) => {
      const usuario = await usuariosDao.getByUsername(username)
  
      if (!usuario) {
        return done(null, false)
      }
  
      if (!isValidPassword(usuario, password)) {
        return done(null, false)
      }

      //emailUsuario = usuario.username
  
      return done(null, usuario)
    })
  )
  
passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  
passport.deserializeUser(async function (id, done) {
    const usuario = await usuariosDao.getById(id)
    done(null, usuario)
  })

/* --------------------- AUTH --------------------------- */

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  }

function isAuth2(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/datos')
  } else {
    next()
  }
}
  
  /* --------------------- ROUTES --------------------------- */
  
  const path = require('path')
const { UsuariosDaoMongoDB } = require('../dao/usuarios/UsuariosDaoMongoDB.js')
const { createHash } = require('crypto')
const { runInNewContext } = require('vm')
  //const ruta = path.resolve(__dirname, '../views')

  // REGISTER
  sesionesRouter.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/register.html'))
    // res.sendFile(path.resolve(process.cwd(), '/views/register.html'))
  })
  
  sesionesRouter.post(
    '/register',
    passport.authenticate('register', {
      failureRedirect: '/failregister',
      successRedirect: '/',
    })
  )
  
  sesionesRouter.get('/failregister', (req, res) => {
    //res.render('register-error')
    res.sendFile(path.resolve(__dirname, '../public/register-error.html'))
  })

// LOGIN
sesionesRouter.get('/login', isAuth2, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/login.html'))
  })
  
sesionesRouter.post(
'/login',
  passport.authenticate('login', {
    failureRedirect: '/faillogin',
    successRedirect: '/datos',
})
)

sesionesRouter.get('/faillogin', (req, res) => {
    //res.render('login-error')
    res.sendFile(path.resolve(__dirname, '../public/login-error.html'))
})

/* --------- INICIO ---------- */
sesionesRouter.get('/', isAuth, (req, res) => {
    res.redirect('/datos')
  })

// DATOS
sesionesRouter.get('/datos', isAuth, (req, res) => {
    /*res.render('datos', {
      datos: req.user.username,
    })*/
    res.sendFile(path.resolve(__dirname, '../public/home.html'))
  })

sesionesRouter.get('/modificarProductos', isAuth, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/modificarProductos.html'))
  })

sesionesRouter.get('/eliminarProductos', isAuth, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/eliminarProductos.html'))
  })

sesionesRouter.get('/carrito', isAuth, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/carrito.html'))
  })

sesionesRouter.get('/info', isAuth, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/info.html'))
  })
  
/* --------- LOGOUT ---------- */
sesionesRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

/* ------ OBTENER ID Usuario y nombre ---------- */
sesionesRouter.get('/auth', isAuth, (req, res) => {
  res.send({
    id: req.user.id,
    nombre: req.user.nombre,
    username: req.user.username,
    nroTelefono: req.user.nroTelefono
})
})

/* ------ OBTENER DATOS DEL USUARIO ---------- */
sesionesRouter.get('/getInfo', isAuth, (req, res) => {
    let photo = ""

    const checkPermissions = file => {
      try {
        fs.accessSync(file, fs.constants.R_OK);
        return true
      } catch (err) {
        return false
      }
    };

    if (checkPermissions(`./public/uploads/${req.user.id}.jpg`)) {
      photo = `../uploads/${req.user.id}.jpg`
    } else if (checkPermissions(`./public/uploads/${req.user.id}.png`)) {
      photo = `../uploads/${req.user.id}.png`
    } else if (checkPermissions(`./public/uploads/${req.user.id}.jpeg`)) {
      photo = `../uploads/${req.user.id}.jpeg`
    } else {
      photo = `../uploads/photo.png`
    }


  res.send({
    nombre: req.user.nombre,
    username: req.user.username,
    direccion: req.user.direccion,
    edad: req.user.edad,
    nroTelefono: req.user.nroTelefono,
    photo: photo
  })
})


/* ------ FUNCIONES BCRYPT --------*/
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password)
}

function createHashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

/* ------ CREACION CARRITO --------*/
const saveCarrito = async() => {
  const productos = { productos: [] }
  
  await carritosDao.save(productos)
}

/* ------ GUARDAR FOTO --------*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ storage })

sesionesRouter.post('/uploadfile', unlinkPhoto, upload.single('myFile'), (req, res, next) => {
  const file = req.file
  /*if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }*/
  res.redirect('/info')
})

function unlinkPhoto(req, res, next){
  if (checkPermissions(`./public/uploads/${req.user.id}.jpg`)) {
    fs.unlinkSync(`./public/uploads/${req.user.id}.jpg`)
  } else if (checkPermissions(`./public/uploads/${req.user.id}.png`)) {
    fs.unlinkSync(`./public/uploads/${req.user.id}.png`)
  } else if (checkPermissions(`./public/uploads/${req.user.id}.jpeg`)) {
    fs.unlinkSync(`./public/uploads/${req.user.id}.jpeg`)
  }
  next()
}

const checkPermissions = file => {
  try {
    fs.accessSync(file, fs.constants.R_OK);
      return true
    } catch (err) {
      return false
    }
};


/* ------ ENVIO DE EMAIL --------*/
const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: 'marianobecchero@gmail.com',
      pass: 'gfkmsjugcshurayo'
  }
});

const sendEmail = async(user) => {
  try {
    const mailOptions = {
      from: 'Servidor Node.js',
      to: process.env.email,
      subject: 'Nuevo registro',
      html: `<span>
                Email: ${user.username}<br>
                Nombre: ${user.nombre}<br>
                Direccion: ${user.direccion}<br>
                Edad: ${user.edad}<br>
                Nro de Telefono: ${user.nroTelefono}<br>
            </span>`
    }

    const info = await transporter.sendMail(mailOptions)
    //console.log(info)
  } catch (error) {
    console.log(error)
  }
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

exports.sesionesRouter = sesionesRouter;
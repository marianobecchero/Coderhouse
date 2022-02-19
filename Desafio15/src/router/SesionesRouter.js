const { Router } = require('express')
const session = require('express-session')
const { passport } = require('./middlewares/passport.js')
const { isAuth, isAuth2 } = require('./middlewares/auth.js')


const SesionesRouter = Router()

let emailUsuario

SesionesRouter.use(
  session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
)

SesionesRouter.use(passport.initialize())
SesionesRouter.use(passport.session())
  
  /* --------------------- ROUTES --------------------------- */
  
  const path = require('path')
const { UsuariosDaoMongoDB } = require('../negocio_dao/usuarios/UsuariosDaoMongoDB')
const { createHash } = require('crypto')
const { runInNewContext } = require('vm')
  //const ruta = path.resolve(__dirname, '../views')

  // REGISTER
  SesionesRouter.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/register.html'))
    // res.sendFile(path.resolve(process.cwd(), '/views/register.html'))
  })
  
  SesionesRouter.post(
    '/register',
    passport.authenticate('register', {
      failureRedirect: '/failregister',
      successRedirect: '/',
    })
  )
  
  SesionesRouter.get('/failregister', (req, res) => {
    res.render('register-error')
  })

// LOGIN
SesionesRouter.get('/login', isAuth2, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/login.html'))
  })
  
SesionesRouter.post(
'/login',
  passport.authenticate('login', {
    failureRedirect: '/faillogin',
    successRedirect: '/datos',
})
)

SesionesRouter.get('/faillogin', (req, res) => {
    res.render('login-error')
})

/* --------- INICIO ---------- */
SesionesRouter.get('/', isAuth, (req, res) => {
    res.redirect('/datos')
  })

// DATOS
SesionesRouter.get('/datos', isAuth, (req, res) => {
    /*res.render('datos', {
      datos: req.user.username,
    })*/
    res.sendFile(path.resolve(__dirname, '../../public/home.html'))
  })
  
/* --------- LOGOUT ---------- */
SesionesRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

/* ------ OBTENER EMAIL ---------- */
SesionesRouter.get('/auth', isAuth, (req, res) => {
  res.send({
    email: req.user.username
})
})

exports.SesionesRouter = SesionesRouter;
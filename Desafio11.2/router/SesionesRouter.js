const { Router } = require('express')
const session = require('express-session')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { UsuariosDao } = require('../dao/usuarios/index')
const bcrypt = require('bcrypt')

const SesionesRouter = Router()

let emailUsuario

/* ------------------ DATABASE -------------------- */

//const usuarios = []

/* --------------------- MIDDLEWARE --------------------------- */

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

/* ------------------ PASSPORT -------------------- */

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {

      const usuario = await UsuariosDao.getByUsername(username)
      if (usuario) {
        return done(null, false)
      }

      const user = {
        id: `${Date.now()}`,
        username: username,
        password: createHashPassword(password),
      }
      await UsuariosDao.save(user)

      return done(null, user)
    }
  )
)

passport.use(
    'login',
    new LocalStrategy( async(username, password, done) => {
      const usuario = await UsuariosDao.getByUsername(username)
  
      if (!usuario) {
        return done(null, false)
      }
  
      if (!isValidPassword(usuario, password)) {
        return done(null, false)
      }

      emailUsuario = usuario.username
  
      return done(null, usuario)
    })
  )
  
passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  
passport.deserializeUser(async function (id, done) {
    const usuario = await UsuariosDao.getById(id)
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
const { UsuariosDaoMongoDB } = require('../dao/usuarios/UsuariosDaoMongoDB')
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
    res.sendFile(path.resolve(__dirname, '../public/home.html'))
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


/* ------ FUNCIONES BCRYPT --------*/
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password)
}

function createHashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

exports.SesionesRouter = SesionesRouter;
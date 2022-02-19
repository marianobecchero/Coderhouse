const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { UsuariosDao } = require('../../negocio_dao/usuarios/index')
const bcrypt = require('bcrypt')

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

    function isValidPassword(user, password) {
        return bcrypt.compareSync(password, user.password)
      }
      
      function createHashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      }

exports.passport = passport;
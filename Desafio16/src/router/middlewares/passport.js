const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { UserController } = require('../../controller/UserController.js')

const userController = new UserController()

passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {

        const user = await userController.createUser(username, password)

        return done(null, user)
      }
    )
  )
  
  passport.use(
      'login',
      new LocalStrategy( async(username, password, done) => {
        const user = await userController.getLogin(username, password)
    
        return done(null, user)
      })
    )
    
  passport.serializeUser(function (user, done) {
      done(null, user.id)
    })
    
  passport.deserializeUser(async function (id, done) {
      const user = await userController.getById(id)
      done(null, user)
    })

exports.passport = passport;
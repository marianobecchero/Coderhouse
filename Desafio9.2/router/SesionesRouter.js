const { Router } = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const SesionesRouter = Router()

SesionesRouter.use(session({
    /* ----------------------------------------------------- */
    /*           Persistencia por mongoDB database           */
    /* ----------------------------------------------------- */
    store: MongoStore.create({ 
        mongoUrl: 'mongodb+srv://mariano:mariano@cluster0.xgcqb.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    /* ----------------------------------------------------- */

    secret: 'shhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

SesionesRouter.post('/login', async (req, res) => {
    const execute = async() => {
        const data = req.body
        if (req.session.nombre) {
            res.send({ mensaje: 'Ya estas Conectado' })
        }
        else {
            req.session.nombre = data.nombre
            res.send({ mensaje: `Bienvenido/a ${data.nombre}!`, sesion: req.session.id })
            //console.log(req.session.id)
        }
    }
    execute()
})

SesionesRouter.get('/logout', (req, res) => {
    const execute = async() => {
        req.session.destroy(err => {
            if (err) {
              //res.json({ error: 'olvidar', body: err })
            } else {
              res.send({ mensaje: 'Hasta luego' })
            }
          })
    }
    execute()
})

SesionesRouter.get('/state', (req, res) => {
    const execute = async() => {
        if (req.session.nombre) {
            console.log(req.session.id)
            res.send({
                state: 'on',
                nombre: req.session.nombre
            })
        }
        else {
            res.send({ state: 'off' })
            console.log(req.session.id)
        }
    }
    execute()
})

exports.SesionesRouter = SesionesRouter;
const { Router } = require('express')
const session = require('express-session')

const SesionesRouter = Router()

SesionesRouter.use(session({
    /* ----------------------------------------------------- */
    /*           Persistencia por mongoDB database           */
    /* ----------------------------------------------------- */
    // store: MongoStore.create({ mongoUrl: 'mongodb://localhost/sesiones' }),   // Local, con esto funciona perfect
    /*store: MongoStore.create({ 
        mongoUrl: 'mongodb+srv://coderhouse:coderhouse@myprimeratlas.2tr0z.mongodb.net/sesiones?retryWrites=true&w=majority'
    }),*/
    /* ----------------------------------------------------- */

    secret: 'palabranueva',
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
            res.send({ mensaje: `Bienvenido ${data.nombre}!` })
        }
    }
    execute()
})

SesionesRouter.get('/state', (req, res) => {
    const execute = async() => {
        if (req.session.nombre) {
            res.send({
                state: 'on',
                nombre: req.session.nombre
            })
        }
        else {
            res.send({ state: 'off' })
        }
    }
    execute()
})

exports.SesionesRouter = SesionesRouter;
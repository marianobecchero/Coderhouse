const { Router } = require('express')
const { login, auth, register } = require('./middlewares/jwt')


const UsersRouter = Router()

/* --------- REGISTER ---------- */

/*UsersRouter.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html')
})*/

UsersRouter.post('/register', register, (req,res) => {
})

/*UsersRouter.get('/register-error', (req, res) => {
    res.render('register-error');
})*/


/* --------- LOGIN ---------- */
/*UsersRouter.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})*/

UsersRouter.post('/login', login, (req, res) => {
})

/*UsersRouter.get('/login-error', (req, res) => {
    res.render('login-error');
})*/

/* --------- API DE DATOS ---------- */
/*UsersRouter.get('/api/datos', auth, (req, res) => {
    return res.status(200).json({ ok: 'Mariano genio' })
})*/
/*UsersRouter.get('/api/datos', jwt.auth, (req, res) => {
    const usuario = usuarios.find(usuario => usuario.nombre == req.user.nombre)
    if (!usuario) {
        return res.status(404).json({ error: 'usuario no encontrado' });
    }

    usuario.contador++
    res.json({
        datos: usuario,
        contador: usuario.contador
    })
})*/


exports.UsersRouter = UsersRouter;
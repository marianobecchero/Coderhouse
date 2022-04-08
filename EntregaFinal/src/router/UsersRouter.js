const { Router } = require('express')
const { login, auth } = require('./middlewares/jwt')
const { upload } = require('./middlewares/multer')
const { UserController } = require ('../controller/UserController')

const userController = new UserController()


const UsersRouter = Router()

UsersRouter.post('/register', (req,res) => {
    execute = async() => {
        const { surname, name, username, password, cellphone } = req.body

        const newUser = await userController.createUser(surname, name, username, password, cellphone, '-')
        if (!newUser) {
            return res.status(400).json({ error: 'Username already exist' });
        }

        return res.status(200).json({ success: 'Successfully registered user' })
    }
    execute()
})

UsersRouter.post('/login', login, (req, res) => {
})

UsersRouter.post('/upload/:idUser', auth, upload.single('myFile'), (req, res) => {
    execute = async () => {
        const idUser = req.params.idUser
        const photoURL = req.file.path
        const result = await userController.upload(idUser, photoURL)
        return res.status(200).json( result )
    }
    execute()
})


exports.UsersRouter = UsersRouter;
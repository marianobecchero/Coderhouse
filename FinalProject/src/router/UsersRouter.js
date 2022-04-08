const { Router } = require('express')
const { login, auth } = require('./middlewares/jwt')
const { upload } = require('./middlewares/multer')
const { UserController } = require ('../controller/UserController')

const userController = new UserController()


const UsersRouter = Router()

UsersRouter.post('/register', userController.createUser, (req,res) => {
})

UsersRouter.post('/login', login, userController.getLogin, (req, res) => {
})

/*----------- SUBO LA IMAGEN ----------------*/
UsersRouter.post('/upload/:idUser', auth, upload.single('myFile'), userController.upload, (req, res) => {
})


exports.UsersRouter = UsersRouter;
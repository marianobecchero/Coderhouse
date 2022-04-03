const jwt = require("jsonwebtoken");
const { UserController } = require('../../controller/UserController.js')

const userController = new UserController()

const PRIVATE_KEY = "admin";

register = async (req, res) => {
  const { surname, name, username, password, cellphone, photoURL } = req.body

  const newUser = await userController.createUser(surname, name, username, password, cellphone, photoURL)
  if (!newUser) {
      return res.status(400).json({ error: 'Username already exist' });
  }

  return res.status(200).json({ success: 'Successfully registered user' })

  //const access_token = jwt.generateAuthToken(nombre);
  //res.json({ access_token });
}

login = async(req, res) => {
  const { username, password } = req.body
  
  const user = await userController.getLogin(username, password)
  if (user){
    const token = jwt.sign({ data: username }, PRIVATE_KEY, { expiresIn: '1h' });
    return res.header('access-token', token).json({ token })
  } else {
    return res.status(400).json({ error: 'User not found or invalid credentials' })
  }
  
}

auth = async (req, res, next) => {
    //const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
    const authHeader = req.header('access-token')
  
    if (!authHeader) {
      return res.status(401).json({
        error: 'Authentication is required to access this resource',
        detail: 'Authentication token not found'
      })
    }
  
    //const token = authHeader.split(' ')[1]
  
    /*if (!token) {
      return res.status(401).json({
        error: 'Authentication is required to access this resource',
        detail: 'Invalid token format'
      })
    }*/
  
    try {
      req.user = jwt.verify(/*token*/ authHeader, PRIVATE_KEY);
    } catch (ex) {
      return res.status(403).json({
        error: 'Invalid token',
        detail: 'Insufficient access level for the requested resource'
      })
    }
  
    next();
  }

  authAdmin = async (req, res, next) => {
    //const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
    const authHeader = req.header('access-token')
  
    if (!authHeader) {
      return res.status(401).json({
        error: 'Authentication is required to access this resource',
        detail: 'Authentication token not found'
      })
    }
  
    //const token = authHeader.split(' ')[1]
  
    /*if (!token) {
      return res.status(401).json({
        error: 'Authentication is required to access this resource',
        detail: 'Invalid token format'
      })
    }*/
  
    try {
      req.user = jwt.verify(/*token*/ authHeader, PRIVATE_KEY);
    } catch (ex) {
      return res.status(403).json({
        error: 'Invalid token',
        detail: 'Insufficient access level for the requested resource'
      })
    }

    const username = req.body.username
    if (username != 'marianobecchero@gmail.com'){
      return res.status(401).json({ error: 'Insufficient access level for the requested resource' })
    }
  
    next();
  }

module.exports = { register, login, auth, authAdmin }
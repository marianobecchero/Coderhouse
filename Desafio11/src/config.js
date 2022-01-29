//require('dotenv').config()
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path:
        path.resolve(__dirname, '../cred.env')
})

const config = {
    cnxStr: process.env.MONGO_DB,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    }
}

module.exports = { config }
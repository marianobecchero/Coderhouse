require('dotenv').config()

const config = {
    cnxStr: process.env.MONGO_DB,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    }
}

module.exports = { config }
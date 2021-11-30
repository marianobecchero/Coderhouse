// elegir tu persistencia acá
const PERS = 'json'

const config = {
    PERS,
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'srv+mongodb://xxxxxxxxxxxxxxxxxxx',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
    }
}

module.exports = { config }
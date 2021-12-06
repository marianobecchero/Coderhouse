// elegir tu persistencia acá
const PERS = 'memo'

const config = {
    PERS,
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        //cnxStr: 'srv+mongodb://xxxxxxxxxxxxxxxxxxx',
        cnxStr: 'mongodb+srv://mariano:mariano@cluster0.xgcqb.mongodb.net/ecommerce?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        uri: 'DB/coderhouse-2d177-firebase-adminsdk-n6zja-982be2c8c7.json'
    }
}

module.exports = { config }
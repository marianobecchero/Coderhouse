// elegir tu persistencia acá
const PERS = 'mongodb'

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
    }
}

module.exports = { config }
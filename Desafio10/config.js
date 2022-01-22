const config = {
    cnxStr: 'mongodb+srv://mariano:mariano@cluster0.xgcqb.mongodb.net/ecommerce?retryWrites=true&w=majority',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    }
}

module.exports = { config }
const mongoose = require('mongoose');
const config = require('config')
require('dotenv').config();
//const db = config.get('mongoURI');

const dbConnect = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true,
        })
    
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = dbConnect;
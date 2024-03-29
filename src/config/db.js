const mongoose = require('mongoose');
const {config} = require('dotenv');
config();

async function connect (uri) {
    try {
        await mongoose.connect(uri || process.env.MONGO_DB_LOCAL)
        
        console.log('connected to db')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connect;

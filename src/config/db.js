const mongoose = require('mongoose');
const {config} = require('dotenv');
config();

mongoose.set('strictQuery', true);
async function connect (uri) {
    try {
        await mongoose.connect(uri || "mongodb://localhost/27017")
        
        console.log('connected to db')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connect;

const express = require('express');
const connect = require('./config/db')
require('dotenv').config();

connect()


const app = express();

const PORT = 9800;

app.listen(PORT, ()=> 
    console.log(`App is listening on ${PORT} `)
)
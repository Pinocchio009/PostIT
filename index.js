const express = require('express');
const connect = require('./src/config/db')
require('dotenv').config();
const {json} = require('express');
const userRoutes = require('./src/Routes/userRoutes');

connect()


const app = express();
app.use(json());
app.use('/users', userRoutes)

const PORT = 9800;

app.listen(PORT, ()=> 
    console.log(`App is listening on ${PORT} `)
)
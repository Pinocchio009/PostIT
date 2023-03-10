const express = require('express');
const connect = require('./src/config/db')
require('dotenv').config();
const {json} = require('express');
const userRoutes = require('./src/Routes/userRoutes');
const postRoutes = require('./src/Routes/PostRoutes')

connect()


const app = express();
app.use(json());
app.use('/', userRoutes);
app.use('/', postRoutes);

const PORT = 9800;
app.get('/', (req, res)=> {
    res.send('i am coming')
});

app.listen(PORT, ()=> 
    console.log(`App is listening on ${PORT} `)
)
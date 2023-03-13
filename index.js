const express = require('express');
const connect = require('./src/config/db')
require('dotenv').config();
const {json} = require('express');
const userRoutes = require('./src/Routes/userRoutes');
const postRoutes = require('./src/Routes/PostRoutes');
const commentRoutes = require('./src/Routes/commentRoutes')
const {getData} = require('./doc')


connect()


const app = express();
app.use(json());
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);
app.use('/', getData)

const PORT = 9800;
app.get('/', (req, res)=> {
    res.send('i am coming')
});

app.listen(PORT, ()=> 
    console.log(`App is listening on ${PORT} `)
)
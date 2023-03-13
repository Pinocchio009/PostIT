const express = require('express');
const connect = require('./src/config/db')
require('dotenv').config();
const {json} = require('express');
const userRoutes = require('./src/Routes/userRoutes');
const postRoutes = require('./src/Routes/PostRoutes');
const commentRoutes = require('./src/Routes/commentRoutes')

connect()


const app = express();
app.use(json());
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);


const PORT = 9800;
app.get('/doc', async (req, res) => {
    res.redirect('/to');
  });
  
  app.get('/to', (req, res) => {
    res.send('https://documenter.getpostman.com/view/18013502/2s93JtQixL');
  });
  async function getData() {
    const res = await axios.get('https://post-it-quni.onrender.com/doc');
    // Do something with res.data
    console.log(res.data);
  }
  
  getData();  

app.listen(PORT, ()=> 
    console.log(`App is listening on ${PORT} `)
)
const express = require('express');
const axios = require('axios');

const app = express();

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

module.exports = {
  app,
  getData,
};

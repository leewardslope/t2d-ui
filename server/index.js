import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// const path = require('path');
const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  return res.send('Hello Nodejs');
});

app.get('/ping', (req, res) => {
  return res.send('pong');
});

app.post('/post', (req, res) => {
  console.log('Connected to React');
  res.redirect('/');
});

app.get('/post', (req, res) => {
  console.log('Connected to React');
  res.redirect('/');
});

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

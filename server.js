// cd "C:\Users\Користувач\Desktop\Paws-n-Play"
// nodemon server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

mongoose.connect('mongodb://localhost:27017/Paws-n-Play');

const messageSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  message: String,
  agreement: Boolean
});

const subscribeSchema = new mongoose.Schema({
  email: String
});

const Message = mongoose.model('Message', messageSchema);
const Subscribe = mongoose.model('Subscribe', subscribeSchema);

app.post('/message', async (req, res) => {
  const newMessage = new Message(req.body);
  await newMessage.save();
  res.send('Message saved');
});

app.post('/subscribe', async (req, res) => {
  const newSubscribe = new Subscribe(req.body);
  await newSubscribe.save();
  res.send('Subsciber saved');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
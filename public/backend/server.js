// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://mongodb-service:27017/messages', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.post('/messages', async (req, res) => {
  const { text } = req.body;
  const message = new Message({ text });
  await message.save();
  res.json({ status: 'Message saved' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

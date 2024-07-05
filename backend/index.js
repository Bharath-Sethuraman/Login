const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
mongoose.connect('mongodb://127.0.0.1:27017/Logindata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String
  }));

app.use(bodyParser.json());
app.use(cors());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username:username, password:password });
    console.log(user);
    if (user) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  });
  app.post('/changepassword', async (req, res) => {
    const { username, email } = req.body;
    const user = await User.findOne({ username:username, email:email });
    console.log(user);
    if (user) {
      res.status(200).send({ message: 'You are registered' });
    } else {
      res.status(401).send({ message: "'You're not registered" });
    }
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
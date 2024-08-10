require('dotenv').config();

const express = require('express');
const app = express();
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const PORT = 3000;
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_CONN_STR)
  .then(() => {
    console.log('DB接続中');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, console.log('server is running'));

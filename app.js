const express = require('express');

const morgan = require('morgan');

const createError = require('http-errors');

const PORT = process.env.PORT || 5000;

const authroute = require('./routes/auth');

const { verifyAccessToken } = require('./helpers/jwt_helper');

require('dotenv').config();

require('./helpers/init_mongodb');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', verifyAccessToken, async (req, res, next) => {
  res.send('Hello World');
});

app.use('/auth', authroute);

app.use(async (req, res, next) => {
  const Error = createError.NotFound();
  next(Error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.listen(PORT, () => console.log(`Server Running at ${PORT}`));

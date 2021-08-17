const express = require('express');

const {
  logout,
  refreshtoken,
  register,
  login,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh-token', refreshtoken);

module.exports = router;

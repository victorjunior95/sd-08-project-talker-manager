const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const { checkLoginEmailMiddleware, checkLoginPasswordMiddleware } = require('../middlewares');

// Requisito 03
router
  .post('/login',
  checkLoginEmailMiddleware,
  checkLoginPasswordMiddleware,
  (request, response) => {
  response.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

module.exports = router;

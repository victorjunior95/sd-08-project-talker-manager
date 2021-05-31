const express = require('express');
const tokenCreate = require('./desafio3');

const route = express.Router();

route.post('/', async (req, res) => {
  const { email, password } = req.body;
  const { message, code, err } = await tokenCreate.addEmailPassword(email, password);
  
  if (err) return res.status(err.code).json({ message: err.message });
  
  return res.status(code).json({ token: message });
});

module.exports = route;

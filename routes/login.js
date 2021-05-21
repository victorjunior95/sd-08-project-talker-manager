const express = require('express');
const { nanoid } = require('nanoid');
const { verifyLoginInput } = require('../middlewares');

const route = express.Router();

route.use(verifyLoginInput);

route.post('/', (_req, res) => {
  res.status(200).json({ token: nanoid(16) });
});

module.exports = route;

const express = require('express');
const { verifyLoginInput, updateToken } = require('../middlewares');

const route = express.Router();

route.use(verifyLoginInput, updateToken('./data/token.json'));

route.post('/', (req, res) => {
  res.status(200).json({ token: req.token });
});

module.exports = route;

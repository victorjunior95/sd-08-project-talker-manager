const express = require('express');

const { loginMiddleware } = require('../middleware/LoginMiddleware');

const route = express.Router();

route.post('/', loginMiddleware, (req, res) => {
  res.status(200).json(req.token);
});

module.exports = route;

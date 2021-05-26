const express = require('express');
const { signIn } = require('../Middlewares');

const route = express.Router();

route.post('/', signIn);

module.exports = route;
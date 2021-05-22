const express = require('express');
const middlewere = require('../middlewere');

const route = express.Router();

route.post('/', middlewere.signIn);

module.exports = route;
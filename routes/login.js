const express = require('express');
const email = require('../middlewares/email');
const password = require('../middlewares/password');
const token = require('../middlewares/token');

const app = express();

app.use('/', [email, password, token]);

module.exports = app;

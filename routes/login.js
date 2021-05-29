const express = require('express');
const bodyParser = require('body-parser');
const loginMiddleware = require('../middlewares/loginMiddleware');

const app = express();
app.use(bodyParser.json());

app.post('/', loginMiddleware);

module.exports = app;
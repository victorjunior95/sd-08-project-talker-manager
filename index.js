const express = require('express');

const app = express();

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const router = require('./route');

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', router.login);

app.use('/talker', router.talker);

app.listen(PORT, () => {
  console.log('Online');
});
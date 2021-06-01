const express = require('express');
const login = require('./routes/login');
const talkers = require('./routes/talker');

const app = express();

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', login);
app.use('/talker', talkers);

app.listen(PORT, () => {
  console.log('Online');
});

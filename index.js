const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./Routes/talker');
const login = require('./Routes/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', login);
app.use('/talker', talker);

app.listen(PORT, () => {
  console.log('Online');
});

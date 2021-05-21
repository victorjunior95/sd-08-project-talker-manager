const express = require('express');
const talker = require('./routes/talker');
const login = require('./routes/login');
const middlewares = require('./middlewares');

const app = express();

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talker);
app.use('/login', login);

app.use(middlewares.handleErrors);

app.listen(PORT, () => {
  console.log('Online');
});

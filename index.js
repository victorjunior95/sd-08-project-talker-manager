const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./src/routes/talker');
const middleware = require('./src/middlewares');
const login = require('./src/routes/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talker);
app.use('/login', login);
app.use(middleware.handleErrors);

app.listen(PORT, () => {
  console.log('Online');
});

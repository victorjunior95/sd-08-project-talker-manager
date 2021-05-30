const express = require('express');
const bodyParser = require('body-parser');
const { retornaPalestrantes } = require('./middlewares');
const { retornaUmPalestrante } = require('./middlewares');
const { validaLogin } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// crie o endpoint GET /talker
app.get('/talker', retornaPalestrantes);

// crie o endpoint GET /talker/:id
app.get('/talker/:id', retornaUmPalestrante);

// crie o endpoint POST /login
app.post('/login', validaLogin);

app.listen(PORT, () => {
  console.log('Online');
});

const express = require('express');
const bodyParser = require('body-parser');
const { retornaPalestrantes, deletaUmPalestrante } = require('./middlewares');
const { adicionaUmPalestrante } = require('./middlewares');
const { validaTokenAutenticacao } = require('./middlewares');
const { validaNome } = require('./middlewares');
const { validaIdade } = require('./middlewares');
const { verificaNota } = require('./middlewares');
const { validaData } = require('./middlewares');
const { verificaTalk } = require('./middlewares');
const { retornaUmPalestrante } = require('./middlewares');
const { validaLogin } = require('./middlewares');
const { editaUmPalestrante } = require('./middlewares');

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

// crie o endpoint POST /talker
/* Ajuda do Paulo Simões para validar os testes */
app.post('/talker',
validaTokenAutenticacao,
validaNome,
validaIdade,
verificaTalk,
verificaNota,
validaData,
adicionaUmPalestrante);

// crie o endpoint PUT /talker/:id
app.put('/talker/:id',
validaTokenAutenticacao,
validaNome,
validaIdade,
verificaTalk,
verificaNota,
validaData,
editaUmPalestrante);

// crie o endpoint DELETE /talker/:id
app.delete('/talker/:id', validaTokenAutenticacao, deletaUmPalestrante);

app.listen(PORT, () => {
  console.log('Online');
});

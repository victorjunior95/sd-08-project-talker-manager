const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', middlewares.buscarPalestrantes);

// Requisito 2
app.get('/talker/:id', middlewares.buscarPorId);

// Requisito 3
app.post('/login',
middlewares.verificarLogin);

// Requisito 4
app.post('/talker',
middlewares.verificarToken,
middlewares.verificarNome,
middlewares.verificarIdade,
middlewares.verificarCampoTalk,
middlewares.verificarDadosTalk,
middlewares.adicionarPalestrante);

// Requisito 5
app.put('/talker/:id',
middlewares.verificarToken,
middlewares.verificarNome,
middlewares.verificarIdade,
middlewares.verificarCampoTalk,
middlewares.verificarDadosTalk,
middlewares.editarPalestrante);

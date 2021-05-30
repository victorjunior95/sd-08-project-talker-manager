const express = require('express');
const bodyParser = require('body-parser');

const middlewaresLogin = require('./middlewares/login/verificaLogin');
const middlewaresPalestrantes = require('./middlewares/palestrante');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req 01
app.get('/talker', middlewaresPalestrantes.getAllTalkers);

// Req 02
app.get('/talker/:id', middlewaresPalestrantes.palestrantePorId);

// Req 03
app.post('/login', middlewaresLogin);

// Req 04
app.post('/talker',
middlewaresPalestrantes.verificaToken,
middlewaresPalestrantes.verificaNome,
middlewaresPalestrantes.verificaIdade,
middlewaresPalestrantes.verificaTalk,
middlewaresPalestrantes.verificaRate,
middlewaresPalestrantes.verificaWatchedAt,
middlewaresPalestrantes.adicionaPalestrante);

// Req 05
app.put('/talker/:id',
middlewaresPalestrantes.adicionaPalestrante,
// middlewaresPalestrantes.editaPalestrante,
middlewaresPalestrantes.verificaTalk,
middlewaresPalestrantes.verificaWatchedAt,
middlewaresPalestrantes.verificaIdade,
middlewaresPalestrantes.verificaNome,
middlewaresPalestrantes.verificaRate,
middlewaresPalestrantes.verificaToken);

// Req 06
app.delete('/talker/:id',
middlewaresPalestrantes.verificaToken,
middlewaresPalestrantes.deletaPalestrante);

// Req 07
app.get('/talker/search',
middlewaresPalestrantes.verificaToken,
middlewaresPalestrantes.pesquisaPalestrante);

// Testando porta
app.listen(PORT, () => {
  console.log('Online');
});

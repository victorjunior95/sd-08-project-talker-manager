const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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
app.get('/talker', async (_request, response) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  return response.status(HTTP_OK_STATUS).json(await JSON.parse(data));
});

// Req 02
app.get('talker/:id', async (request, response) => {
  const { id } = request.params;
  const listaDePalestrantes = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
  const pessoaPalestrante = await listaDePalestrantes
    .find((pessoa) => pessoa.id === parseInt(id, 10));
  if (!pessoaPalestrante) {
    return response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(pessoaPalestrante);
});

// Req 03
app.post('/login', middlewaresLogin.verificaLogin, (_request, _response) => {});

// Req 04
app.post('/talker',
middlewaresPalestrantes.adicionaPalestrante,
middlewaresPalestrantes.verificaTalk,
middlewaresPalestrantes.verificaWatchedAt,
middlewaresPalestrantes.verificaIdade,
middlewaresPalestrantes.verificaNome,
middlewaresPalestrantes.verificaRate,
middlewaresPalestrantes.verificaToken,
async (_request, _response) => {});

// Req 05
app.put('/talker/:id',
middlewaresPalestrantes.adicionaPalestrante,
middlewaresPalestrantes.editaPalestrante,
middlewaresPalestrantes.verificaTalk,
middlewaresPalestrantes.verificaWatchedAt,
middlewaresPalestrantes.verificaIdade,
middlewaresPalestrantes.verificaNome,
middlewaresPalestrantes.verificaRate,
middlewaresPalestrantes.verificaToken,
async (_request, _response) => {});

// Req 06
app.delete('/talker/:id',
middlewaresPalestrantes.verificaToken,
middlewaresPalestrantes.deletaPalestrante,
async (_request, _response) => {});

// Req 07
app.get('/talker/search',
middlewaresPalestrantes.pesquisaPalestrante,
(_request, _response) => {});

app.listen(PORT, () => {
  console.log('Online');
});

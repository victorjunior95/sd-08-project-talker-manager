const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const middlewares = require('./middlewares/login/verificaLogin');
const {
  adicionaPalestrante,
  deletaPalestrante,
  editaPalestrante,
  pesquisaPalestrante,
  verificaTalk,
  verificaWatchedAt,
  verificaIdade,
  verificaNome,
  verificaRate,
  verificaToken,
} = require('./middlewares/palestrante');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
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
app.post('/login', middlewares.verificaLogin.js);

// Req 04
app.post('/talker',
  adicionaPalestrante,
  verificaTalk,
  verificaWatchedAt,
  verificaIdade,
  verificaNome,
  verificaRate,
  verificaToken);

// Req 05
app.put('/talker/:id',
  adicionaPalestrante,
  editaPalestrante,
  verificaTalk,
  verificaWatchedAt,
  verificaIdade,
  verificaNome,
  verificaRate,
  verificaToken);

// Req 06
app.delete('/talker/:id',
  verificaToken,
  deletaPalestrante);

// Req 07
app.get('/talker/search',
  pesquisaPalestrante);

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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
  const listaDePalestrantes = JSON.parse(fs.readFile('./talker.json', 'utf8'));
  const pessoaPalestrante = listaDePalestrantes.find((pessoa) => pessoa.id === parseInt(id, 10));
  if (!pessoaPalestrante) {
    return response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(pessoaPalestrante);
});

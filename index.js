// Leonardo Sardinha
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getAllTalkers = () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const getTalkerById = (id) => {
  const allTalkers = getAllTalkers();
  const talker = allTalkers.filter((elem) => elem.id === id);
  console.log(talker[0]);
  return talker[0];
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/teste', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Teste do aplicativo');
});

app.get('/talker', async (_request, response) => {
  try {
    const resposta = await getAllTalkers();
    response.status(HTTP_OK_STATUS).send(resposta);
  } catch (err) {
    response.status(500).send(`erro encontrado: ${err.message}`);
  }
});

app.get('/talker/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const idParse = parseInt(id, 10);
    const talkerFound = await getTalkerById(idParse);
    response.status(HTTP_OK_STATUS).send(talkerFound);
  } catch (err) {
    response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

getTalkerById(1);
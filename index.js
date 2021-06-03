// Leonardo Sardinha
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getAllTalkers = () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/teste', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Teste do aplicativo');
});

app.get('/talker', async (_request, response) => {
  try {
    const resposta =  await getAllTalkers();
    response.status(HTTP_OK_STATUS).send(resposta);
  } catch (err) {
    response.status(500).send(`erro encontrado: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

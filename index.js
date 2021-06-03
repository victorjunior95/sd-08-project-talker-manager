// Leonardo Sardinha
const fs = require('fs/promises');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const readFilePromise = async () => {
  try {
    const allPeople = await fs.readFile('./talker.json', 'utf-8');
    const allPeopleJson = JSON.parse(allPeople);
    return allPeopleJson;
  } catch (err) {
    return err.message;
  }
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
    const resposta = await readFilePromise();
    response.status(HTTP_OK_STATUS).send(resposta);
  } catch (err) {
    response.status(500).send(`erro encontrado: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

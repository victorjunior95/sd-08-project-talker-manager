const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const response = await fs.promises.readFile('./talker.json', 'utf-8');
    res.send(response);
  } catch (error) {
    res.status(401).send('Erro');
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

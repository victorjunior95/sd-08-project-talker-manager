const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const path = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req01
app.get('/talker', async (req, resp) => {
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  resp.status(200).json(data);
});

// Req02
app.get('/talker/:id', async (req, resp) => {
  const { id } = req.params;
  // console.log(`id solicitado: ${id}`);
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  // console.log(data);
  const searchId = data.find((el) => el.id === Number(id));
  // console.log(searchId);
  if (!searchId) {
    return resp.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return resp.status(200).json(searchId);
});

app.listen(PORT, () => {
  console.log('Online');
});

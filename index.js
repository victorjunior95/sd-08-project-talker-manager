const express = require('express');
const bodyParser = require('body-parser');
const utils = require('./utils/fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  try {
    const data = await utils.getData();

    if (!data) return res.status(HTTP_OK_STATUS).send([]);

    return res.status(HTTP_OK_STATUS).send(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await utils.getData();

    const talker = data.find((object) => object.id === Number(id));

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    return res.status(HTTP_OK_STATUS).send(talker);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

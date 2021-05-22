const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const path = require('path');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
// const CREATED = 201;
// const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
// const PORT_3000 = 3000;
const PORT = '3000';

const talker = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/talker', async (req, res) => {
  const data = await fs.readFile(talker);

  if (!data) {
    return res.status(SUCCESS).send([]);
  }

  return res.status(SUCCESS).send(JSON.parse(data));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFile(talker);

  const findTalker = JSON.parse(data).find((e) => e.id === parseInt(id, 10));

  if (!findTalker) {
    return res
      .status(NOT_FOUND)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(SUCCESS).send(findTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});

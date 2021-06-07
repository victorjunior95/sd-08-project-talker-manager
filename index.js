// Leonardo Sardinha
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./authMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getAllTalkers = () =>
  JSON.parse(fs.readFileSync('./talker.json", "utf-8'));

const getTalkerById = (id) => {
  const allTalkers = getAllTalkers();
  const talker = allTalkers.filter((elem) => elem.id === id);
  return talker[0];
};

const generateToken = () => Math.random().toString(18).substr(2);

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
    if (talkerFound) {
      response.status(HTTP_OK_STATUS).send(talkerFound);
    } else {
      response.status(404).send({
        message: 'Pessoa palestrante não encontrada',
      });
    }
  } catch (err) {
    response.status(500).send({ err });
  }
});

app.post(
  '/login',
  authMiddleware.authEmail,
  authMiddleware.authPassword,
  async (req, res) => {
    const token = generateToken();
    res.status(HTTP_OK_STATUS).json({ token: token });
  }
);

app.listen(PORT, () => {
  console.log('Online');
});

getTalkerById(1);

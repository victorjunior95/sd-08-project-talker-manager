const express = require('express');
const bodyParser = require('body-parser');

const {
  getTalkers,
  getTalkersById,
  login,
  createTalker,
} = require('./middlewares');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();
app.use(bodyParser.json());

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.post('/login', login);
app.get('/talker/:id', getTalkersById);
app.get('/talker', getTalkers);
app.post('/talker', createTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Projeto Online');
});

const express = require('express');
const bodyParser = require('body-parser');

const {
  getTalkers,
  getTalkersById,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', getTalkersById);
app.get('/talker', getTalkers);

app.listen(PORT, () => {
  console.log('Online');
});

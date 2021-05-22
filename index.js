const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// const talker = require('./talker.json');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

function kombi() {
 return JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
// return 'ops';
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
  console.log(kombi());
});

app.get('/talker', (_request, response) => {
  const ops = kombi();
  if (ops.length === 0) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  response.status(HTTP_OK_STATUS).send(ops);
});

app.get('/talker/:id', (req, response) => {
  const ops = kombi();
  const { id } = req.params;
  const person = ops.filter((element) => element.id === Number(id));
  if (person.length === 0) {
    return response.status(404)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).send(person[0]);
});

app.listen(PORT, () => {
  console.log('Online');
});

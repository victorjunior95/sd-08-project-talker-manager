const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const middlewares = require('./middlewares');
// const login = require('./routes/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// try {
//   const dataJSON = fs.readFileSync('./talker.json', 'utf8');
//   data = JSON.parse(dataJSON);
// } catch (e) {
//   console.error(e);
// }

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const dataJSON = fs.readFileSync('./talker.json', 'utf8');
  const data = JSON.parse(dataJSON);
  res.status(200).json(data);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const dataJSON = fs.readFileSync('./talker.json', 'utf8');
  const data = JSON.parse(dataJSON);
  const personById = data.find((person) => person.id === Number(id));
  if (personById) {
    res.status(200).json(personById);
  }
  res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', middlewares.login);

app.listen(PORT, () => {
  console.log('Online');
});

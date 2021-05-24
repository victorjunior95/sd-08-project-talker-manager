const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const dataJSON = fs.readFileSync('./talker.json', 'utf8');
  const data = JSON.parse(dataJSON);
  return res.status(200).json(data);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const dataJSON = fs.readFileSync('./talker.json', 'utf8');
  const data = JSON.parse(dataJSON);
  const personById = data.find((person) => person.id === Number(id));
  if (personById) {
    return res.status(200).json(personById);
  }
  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', middlewares.login);

app.post('/talker', 
  middlewares.token,
  middlewares.name,
  middlewares.age,
  middlewares.talk,
  middlewares.talkValues,
  (req, res) => {
    try {
      const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
      const newTalker = req.body;
      newTalker.id = talkers.length + 1;
      talkers.push(newTalker);
      fs.writeFileSync('talker.json', JSON.stringify(talkers));
      return res.status(201).json(newTalker);
    } catch (e) {
      return e;
    }
  });

app.listen(PORT, () => {
  console.log('Online');
});

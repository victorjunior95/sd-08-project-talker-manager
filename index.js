const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const file = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search',
  middlewares.token,
  (req, res) => {
    try {
      const talkers = JSON.parse(fs.readFileSync(file, 'utf8'));
      const { q } = req.query;
      const talkerBySearch = talkers.filter((person) => person.name.includes(q));
      res.status(200).send(talkerBySearch);
    } catch (e) {
      return e;
    }
  });

app.get('/talker', (_req, res) => {
  const dataJSON = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(dataJSON);
  return res.status(200).json(data);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const dataJSON = fs.readFileSync(file, 'utf8');
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
      const talkers = JSON.parse(fs.readFileSync(file, 'utf8'));
      const newTalker = req.body;
      newTalker.id = talkers.length + 1;
      talkers.push(newTalker);
      fs.writeFileSync('talker.json', JSON.stringify(talkers));
      return res.status(201).json(newTalker);
    } catch (e) {
      return e;
    }
  });

  app.put('/talker/:id', 
  middlewares.token,
  middlewares.name,
  middlewares.age,
  middlewares.talk,
  middlewares.talkValues,
  (req, res) => {
    try {
      const talkers = JSON.parse(fs.readFileSync(file, 'utf8'));
      const newTalker = req.body;
      const { id } = req.params;
      const index = talkers.findIndex((person) => person.id === Number(id));
      newTalker.id = Number(id);
      talkers[index] = newTalker;
      fs.writeFileSync('talker.json', JSON.stringify(talkers));
      return res.status(200).json(newTalker);
    } catch (e) {
      return e;
    }
  });

  app.delete('/talker/:id',
    middlewares.token,
    (req, res) => {
      try {
        const talkers = JSON.parse(fs.readFileSync(file, 'utf8'));        
        const { id } = req.params;
        const index = talkers.findIndex((person) => person.id === Number(id));
        talkers.splice(index, 1);        
        fs.writeFileSync('talker.json', JSON.stringify(talkers));
        return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
      } catch (e) {
        return e;
      }
  });

app.listen(PORT, () => {
  console.log('Online');
});

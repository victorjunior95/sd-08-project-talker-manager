const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const middlewares = require('./middlewares');

const registeredSpeakers = require('./fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', rescue(async (req, res) => {
  const talkers = await registeredSpeakers.getRegisteredSpeakers();
  res.status(200).json(talkers);
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const talkers = await registeredSpeakers.getRegisteredSpeakers();
  const talkerById = talkers.find((talker) => 
  parseInt(talker.id, 0) === parseInt(req.params.id, 0));

  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerById);
}));

app.post('/login', middlewares.login);

app.post('/talker', middlewares.tokenValidation, middlewares.nameValidation,
 middlewares.ageValidation, middlewares.talkValidation, middlewares.watchedAtValidation,
  middlewares.rateValidation, rescue(async (req, res) => {
    const talkers = await registeredSpeakers.getRegisteredSpeakers();
    const newTalker = req.body;
    newTalker.id = talkers.length + 1;
    talkers.push(newTalker);
    await registeredSpeakers.setRegisteredSpeakers(talkers);
    res.status(201).json(newTalker);
  }));

  app.put('/talker/:id', middlewares.tokenValidation, middlewares.nameValidation,
  middlewares.ageValidation, middlewares.talkValidation, middlewares.rateValidation,   
   middlewares.watchedAtValidation, rescue(async (req, res) => {
    const id = Number(req.params.id);
    const talkers = await registeredSpeakers.getRegisteredSpeakers();
    const newTalker = { ...req.body, id };
    const editedTalker = talkers.map((talker) => {
      if (talker.id === id) return newTalker;
      return talker;
    });
    await registeredSpeakers.setRegisteredSpeakers(editedTalker);
    res.status(200).json(newTalker);
  }));

  app.delete('/talker/:id', middlewares.tokenValidation, rescue(async (req, res) => {
    const id = Number(req.params.id);
    const talkers = await registeredSpeakers.getRegisteredSpeakers();
    const deleteById = talkers.find((talker) => talker.id !== id);
    await registeredSpeakers.setRegisteredSpeakers(deleteById);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

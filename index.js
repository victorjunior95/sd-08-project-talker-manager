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

app.get('/talker', middlewares.allTalkers, (req, res) => {
  res.status(200).json(req.talkersAll);
});

app.get('/talker/:id', middlewares.talkerById, (req, res) => {
  if (req.talkerID) {
    res.status(200).json(req.talkerID);
    return;
  }

  res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

app.post('/login', middlewares.loginEmail, middlewares.loginPassword, (_req, res) => {
  res.status(200).json({
    token: '7mqaVRXJSp886CGr',
  });
});

app.post('/talker', middlewares.tokenVerify, middlewares.checkName,
middlewares.checkAge, middlewares.checkTalk, middlewares.checkDateRate, async (req, res) => {
  try {
    const talkers = JSON.parse(await fs.promises.readFile('./talker.json', 'utf-8'));
    const newTalker = {
      name: req.body.name,
      age: req.body.age,
      id: talkers.length + 1,
      talk: req.body.talk,
    };
    talkers.push(newTalker);
    await fs.promises.writeFile('./talker.json', JSON.stringify(talkers));
    res.status(201).json(newTalker);
  } catch (error) {
    console.log(error.menssage);
  }
});

app.put('/talker/:id', middlewares.tokenVerify, middlewares.checkName,
middlewares.checkAge, middlewares.checkTalk, middlewares.checkDateRate, async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = JSON.parse(await fs.promises.readFile('./talker.json', 'utf-8'));
    const newTalker = {
      name: req.body.name,
      age: req.body.age,
      id: parseInt(id, 10),
      talk: req.body.talk,
    };
    talkers.splice(parseInt(id, 10) - 1, 1, newTalker);
    await fs.promises.writeFile('./talker.json', JSON.stringify(talkers));
    res.status(200).json(newTalker);
  } catch (error) {
    console.log(error.menssage);
  }
});

app.delete('/talker/:id', middlewares.tokenVerify, async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = JSON.parse(await fs.promises.readFile('./talker.json', 'utf-8'));
    talkers.splice(parseInt(id, 10) - 1, 1);
    await fs.promises.writeFile('./talker.json', JSON.stringify(talkers));
    res.status(200).json({
      message: 'Pessoa palestrante deletada com sucesso'.
    });
  } catch (error) {
    console.log(error.menssage);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

const express = require('express');
const bodyParser = require('body-parser');
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

app.listen(PORT, () => {
  console.log('Online');
});

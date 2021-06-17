const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
const login = require('./middlewares/login');
const validateToken = require('./middlewares/validateToken');
const createTalker = require('./createTalker');
const updateTalker = require('./updateTalker');
const deleteTalker = require('./deleteTalker');

const getTalkers = require('./services/getTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', login);

app.get('/talker/:id', (req, res) => {
  try {
    const { id } = req.params;
    const talkerFile = getTalkers();
  
    const talkerById = talkerFile.find((talker) => talker.id === Number(id));
    
    if (!talkerById) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

    return res.status(HTTP_OK_STATUS).send(talkerById);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/talker', (_req, res) => {
  try {
    const talkerFile = getTalkers();
    return res.status(HTTP_OK_STATUS).send(talkerFile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/talker/:id', validateToken, updateTalker);

app.post('/talker', validateToken, createTalker); 

app.delete('/talker/:id', validateToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});

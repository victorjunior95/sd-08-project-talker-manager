const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers, getTalkerById, login, createTalker, editTalker, deleteTalker } = require('./womps');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);
app.get('/talker/:id', getTalkerById);
app.post('/login', login);
app.post('/talker', createTalker);
app.put('/talker/:id', editTalker);
app.delete('/talker/:id', deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});

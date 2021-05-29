const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const getAll = require('./routes/getAll');
const getAllById = require('./routes/getAllById');
const login = require('./routes/login');
const createTalker = require('./routes/createTalker');
const deleteTalker = require('./routes/deleteTalker');

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAll);

app.get('/talker/:id', getAllById);

app.post('/login', login);

app.post('/talker', createTalker);

app.delete('/talker/:id', deleteTalker);

app.listen(PORT, () => {
    console.log('Online');
});

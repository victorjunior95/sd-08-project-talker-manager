const express = require('express');
const bodyParser = require('body-parser');
// const getTalkerJson = require('./fs-promisses');
const talker = require('./talker.js');
const talkerId = require('./talkerId.js');
const talkerLogin = require('./talkerLogin.js');
const newTalker = require('./newTalker.js');
const editTalker = require('./editTalker.js');
const deleteTalker = require('./deleteTalker.js');
const searchTalker = require('./searchTalker.js');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
app.use(searchTalker);
app.post('/login', talkerLogin);
app.get('/talker/:id', talkerId);
app.use('/talker', talker); 
app.use(newTalker);
app.use(editTalker);
app.use(deleteTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

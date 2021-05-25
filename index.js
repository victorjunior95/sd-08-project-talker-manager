const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker/search', middlewares.verifyAutho, middlewares.searchTalker);
app.get('/talker/:id', middlewares.talkerid);
app.put('/talker/:id', middlewares.verifyAutho, middlewares.verifyName, middlewares.verifyAge,
middlewares.verifyTalkOne, middlewares.verifyTalkTwo, middlewares.changeTalker);
app.delete('/talker/:id', middlewares.verifyAutho, middlewares.deleteTalker);

app.get('/talker', middlewares.registertalker);
app.post('/talker', middlewares.verifyAutho, middlewares.verifyName, middlewares.verifyAge,
middlewares.verifyTalkOne, middlewares.verifyTalkTwo, middlewares.createTalker);

app.post('/login', middlewares.login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

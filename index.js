const express = require('express');
const bodyParser = require('body-parser');
const allTalkers = require('./routes/talker');
const login = require('./routes/login');
const searchTalker = require('./routes/searchTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker/search', searchTalker);
app.use('/talker', allTalkers);
app.use('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});

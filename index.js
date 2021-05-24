const express = require('express');
const bodyParser = require('body-parser');
const talkerMidware = require('./Middlewares/talkerMiddleware');

const app = express();
app.use(bodyParser.json());
console.log(talkerMidware);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talkerMidware);

app.listen(PORT, () => {
  console.log('Online');
});
